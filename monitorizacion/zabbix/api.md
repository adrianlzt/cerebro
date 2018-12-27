https://www.zabbix.com/documentation/3.2/manual/api/reference/item

Codigo en frontends/php/include/classes/api/services


# Ruby
https://github.com/red-tux/zbxapi

# Python
## zabbix-gnomes
https://github.com/q1x/zabbix-gnomes
coleccion de scripts
python2
pip install pyzabbix
tiene algunos problemas con espacios en blanco vs tabs
zapi.py nos deja listo para poder escribir cosas tipo:
z host.get(filter={"host": "lec1ama"})


## zabbix-cli
https://github.com/usit-gd/zabbix-cli/blob/master/docs/manual.rst
un coñazo de instalar y al final petaba por syntaxis



## Libreria
https://github.com/gescheit/scripts

pip install zabbix-api

from zabbix_api import ZabbixAPI
zbx = ZabbixAPI("http://zabbix")
zbx.login("Admin", "zabbix")

Poner eso en un fichero y ejecutar con python -i para tener una shell donde hacer pruebas.


Ejemplo:
from zabbix_api import ZabbixAPI
zbx = ZabbixAPI("http://zabbix")
zbx.login("Admin", "zabbix")
zbx_host_list = get_host_by_host_name(zbx, "telegraf")
assert len(zbx_host_list) == 1
zbx_host = zbx_host_list[0]['hostid']
item = zbx.item.get(
  {
    "output": ["lastvalue"],
    "hostids": zbx_host,
    "search": {
      "key_": "telegraf.kernel.boot_time"
    },
    "startSearch": "true"
  }
)
# El search nos encontrará cualquier key_ que haga match, por lo que podría devolver un item con key_ telegraf.kernel.boot_time_us por ejemplo
# Con filter buscamos el match exacto

def get_host_by_host_name(zbx, host_name):
    host_list = zbx.host.get(
            {
                'output': 'extend', 'filter': {'host': [host_name]}
            }
        )
    return host_list


## Obtener más elementos con "selectXXX"
Tenemos que ponerlo con:
"selectTriggers": "1"
"selectTriggers": "ids"
"selectTriggers": False
"selectTriggers": "cualquiercosa"
  devuelve un array con diccionarios {"triggerid": 1234}

"selectTriggers": True
"selectTriggers": "count"
  esto me devuelve la cuenta
  "triggers": 21

"selectTriggers": "extend"
  array con los diccionarios con la descripción entera del array


## Obtener ultimo valor de la métrica especificada en la key buscando como LIKE "NOMBRE%"
{
  "output": ["lastvalue"],
  "hostids": zbx_host,
  "search": {
    "key_": "telegraf.kernel.boot_time"
  },
  "startSearch": "true"
}

## Buscar para un host determinado los items en error y devuelve la clave y el error
Filter busca ese contenido exactamente
{
  "output": ["key_", "error"],
  "hostids": "10108",
  "filter": {"state": "1"}
}


## Otros tipos de objetos
zbx.trigger.get(...)
  triggers con las tags: zbx.trigger.get({ "selectTags": "extend", "hostids": hostid })
  "filter": {"status": "0"}  # solo elementos enabled
zbx.discoveryrule.get(...)
zbx.problem.get(...)


## Map

### Crear mapa
zbx.map.create({"name": "mapa api", "width": 600, "height": 800})

Parece que es necesario especificar "elementid" aunque sea una imagen.


element1 = {"elementtype": 4, "iconid_off": "151", "elementid": "1", "selementid": "1"}
element2 = {"elementtype": 4, "iconid_off": "151", "elementid": "2", "selementid": "2"}
element3 = {"elementtype": 4, "iconid_off": "151", "elementid": "3", "selementid": "3"}
elements = [element1, element2, element3]
link1 = {"selementid1": "1", "selementid2": "2"}
link2 = {"selementid1": "1", "selementid2": "3"}
links = [link1, link2]
zbx.map.create({"name": "mapa api5", "width": 600, "height": 800, "selements": elements, "links": links})



### Obtener mapas
zbx.map.get({"selectSelements": "extend","selectLinks": "extend"})
  mostrando sus elementos y links

Un mapa en concreto:
zbx.map.get({"selectSelements": "extend","selectLinks": "extend", "sysmapids": ["4"]})


### Modificar elementos de un mapa
selements = [{'elementid': '1', 'elementtype': 4, 'iconid_off': '151'}]
zbx.map.update({"sysmapid": 4, "selements": selements})


### Borrar mapas
zbx.map.delete(["8"])


### Obtener macros
>>> zbx.usermacro.get({"output":"extend", "hostids": "10255"})
[{'hostmacroid': '686', 'hostid': '10255', 'macro': '{$PRUEBA}', 'value': 'adri'}]



# py-zabbix, con esta podemos enviar traps
https://pypi.org/project/py-zabbix/

from pyzabbix import ZabbixMetric, ZabbixSender

# Send metrics to zabbix trapper
packet = [
  ZabbixMetric('hostname1', 'test[cpu_usage]', 2),
  ZabbixMetric('hostname1', 'test[system_status]', "OK"),
  ZabbixMetric('hostname1', 'test[disk_io]', '0.1'),
  ZabbixMetric('hostname1', 'test[cpu_usage]', 20, 1411598020),
]

result = ZabbixSender(use_config=True).send(packet)
