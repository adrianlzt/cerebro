#
# Pretty printer para zabbix
# Hace falta que el server tenga la tabla de simbolos, es decir, que si hacemos "file zabbix_server", no ponga stripped
#
# PP para cache->history_items:
# Recorre la estructura history_items de la cache, obteniendo los items que 
# tienen values pendientes de procesar.
# Devuelve el top 10 con los itemids y numero de values pendientes.
#
# Ejemplo de ejecucion, siendo 25266 el PID de un history syncer:
# gdb -p 25266 -P gdb_zabbix_cache.py
#
#
# TODO/IDEAS:
#  - Calcular la velocidad de procesado de los items con mas values
#  - Como conseguir obtener los datos que queremos del breakpoint y dejar al programa que siga corriendo
#    Tal vez algo tipo https://blog.0x972.info/?d=2015/05/12/08/52/11-gdbpython-executing-code-upon-events ?
#

import json
import gdb
from gdb.printing import PrettyPrinter, register_pretty_printer

# Si usamos este breakpoint estaremos parando en una zona con LOCK sobre la cache
# Esto es bueno porque evitamos fallos en la lectura mientras ejecutamos el script
# pero si le cuesta mucho tiempo, significa un bloqueo importante para zabbix
# Por defecto usar el DCsync_history, si no funciona, probar con este
#BREAKPOINT = "hc_pop_items"

# Si paremos en esta funcion, solo estaremos bloqueando un history syncer, pero puede
# que tengamos errores, por intentar acceder a posiciones de memoria que ya no existen
# porque han sido borradas desde que leimos el puntero
BREAKPOINT = "DCsync_history"

class ZabbixHashset(object):
    def __init__(self, val):
        self.val = val

    def parse(self):
	"""
	Extraemos del cache->history_items el numero de slots allocated, cuantos
	valores hay definidos y de esos valores, su itemid y cuando values tienen
	pendientes de ser procesados
	"""
	# tipo de dato del campo data de los slots
        type_zbx_hc_item_t_pointer = gdb.lookup_type("zbx_hc_item_t").pointer()

	# Lista donde almacenamos los dict de itemid y numero de values
	value_counter = []

	# recorremos los slots desde el principio hasta encontrar el primer valor,
	# luego usamos los campos "next" para ir saltando por los slots con values
        for i in range(0, self.val["num_slots"]):
          if str(self.val["slots"][i]) != "0x0":
            slot = self.val["slots"][i]
	    item = slot["data"].cast(type_zbx_hc_item_t_pointer)

	    item_num_values = self.get_num_values(item)
	    value_counter.append({"itemid": int(item["itemid"]), "num_values": item_num_values})

	# Ordenamos la lista de tuplas segun quien tiene mayor numero de values pendientes
	value_counter.sort(key=lambda x: x["num_values"], reverse=True)

	# Dict que devolveremos como respuesta
	resp = { "slots": int(self.val["num_slots"]), "num_data": int(self.val["num_data"]), "data": value_counter }

	return resp

    def to_string(self):
	""" Imprimimos el top 10 de items con mas values (si hay menos de 10, sacamos todos) """
	history_items = self.parse()
	value_counter = history_items["data"]
	resp = { "slots": history_items["slots"], "num_data": history_items["num_data"], "top_num_values": [] }

	for i in range(0, min(len(value_counter), 10)):
	  resp["top_num_values"].append({ "itemid": value_counter[i][0], "num": value_counter[i][1]})
	
        return json.dumps(self.parse(), indent=4)

    def get_num_values(self, item):
        """"Obtener las values para un item"""
	num_values = 1
	
	# Valor mas antiguo de la linked list
	# Siempre tiene valor, si no, no tenemos la entrada en el hashset
	value = item["tail"]["next"]
    	while long(value) != 0:
	    num_values += 1
	    value = value["next"]

	return num_values


class ZabbixBinaryHeap(object):
    def __init__(self, val):
        self.val = val

    def to_string(self):
        return "ToDo"


class CustomPrettyPrinterLocator(PrettyPrinter):
    """Given a gdb.Value, search for a custom pretty printer"""

    def __init__(self):
        super(CustomPrettyPrinterLocator, self).__init__(
            "my_pretty_printers", []
        )

    def __call__(self, val):
        """Return the custom formatter if the type can be handled"""

        typename = gdb.types.get_basic_type(val.type).tag
        if typename is None:
            typename = str(val.type)

        if typename == "zbx_binary_heap_t":
            return ZabbixBinaryHeap(val)
        elif typename == "zbx_hashset_t":
            return ZabbixHashset(val)

class Main:
    def __init__(self):
	# Estructura que usaremos para pasar la informacion desde el breakpoint
	# hasta el procesador
        self.data = None

    def setup(self):
        gdb.execute("set pagination off")
        gdb.execute("set print pretty")
 
    def stop_handler(self,event):
        """
        Handler ejecutado cuando la ejecucion se pare en un break point
        """
        if event.breakpoint.location == BREAKPOINT:
            self.get_cache_history_items()
    
    def get_cache_history_items(self):
        """
        CUIDADO! Esta funcion debe ser rapida para no bloquear mucho tiempo
        la cache de Zabbix
        """
        #gdb.execute("p cache->history_items")
        history_items = ZabbixHashset(gdb.parse_and_eval ('cache->history_items'))
        self.data = history_items.parse()
    
    def process_cache_history_items(self):
	print("Dump data to cache_history_items.json")
	json.dump(self.data, file("cache_history_items.json","w"), indent=4)

    def run(self):
        self.setup()
        gdb.events.stop.connect(self.stop_handler)
    
        # Definimos un temporary breakpoint, es decir, solo paramos una vez.
        # De todas maneras seria el funcionamiento, porque tras parar la primera vez nos salimos
        # Pero lo dejo por si en un futuro podemos continuar en este script para obtener los nombres
        # y hosts de los itemsids, sin tener que usar otro script
        # No disponible hasta gdb 7.7
        #bp = gdb.Breakpoint(BREAKPOINT, gdb.BP_BREAKPOINT, gdb.WP_READ, True, True, None)
        gdb.execute("tbreak " + BREAKPOINT)

	# Esta linea se mantendra en ejecucion hasta que salte el breakpoint y returemos del handler
        gdb.execute("continue")

	self.process_cache_history_items()


register_pretty_printer(None, CustomPrettyPrinterLocator(), replace=True)
main = Main()
main.run()
# Parece que no podemos mantenernos en el script para hacer algun procesado mas lento, ya que estaremos
# bloqueando la ejecucion en el breakpoint.
# Parece que usar threading tampoco funciona: https://bugzilla.redhat.com/show_bug.cgi?id=1116957
# La opcion es sacar el contenido a un fichero y procesarlo con otro script
