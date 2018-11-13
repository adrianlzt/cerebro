Ver estado general de los procesos internos:
ps -eo args | grep zabbix_serve[r] | less


# poller
Items que procesa:
  Código fuente: zabbix_server/poller/poller.c:271
  Función "get_value".
  Ahí tenemos un switch-case con lo que hace el poller:

NOMBRE ITEM           funcion a la que llama
ITEM_TYPE_ZABBIX      get_value_agent
ITEM_TYPE_IPMI        get_value_ipmi
ITEM_TYPE_SIMPLE      get_value_simple
ITEM_TYPE_INTERNAL    get_value_internal (este nombre de func no sale, depende de que pidamos puede salir "get_selfmon_stats" o tal vez ninguno?)
ITEM_TYPE_DB_MONITOR  get_value_db
ITEM_TYPE_AGGREGATE   get_value_aggregate
ITEM_TYPE_EXTERNAL    get_value_external
ITEM_TYPE_SSH         get_value_ssh
ITEM_TYPE_TELNET      get_value_telnet
ITEM_TYPE_CALCULATED  get_value_calculated


## Analisis logs poller (modo debug)
Para ver un ciclo del proceso podemos buscar la linea:
__zbx_zbx_setproctitle

Dentro de cada ciclo siempre sigue hace l proceso de obtener valores, procesar y volver a empezar
In get_values()
...procesa...
End of get_values


### Procesado
DCconfig_get_poller_items
  parece que es cuando recupera algún item a procesar de la cola de los items pollers
substitute_key_macros
  resuelve las macros de la key (si tiene)
get_value
  muestra la key resuleta que tiene que procesar

Aqui llama a la función particular que tiene que procesar este tipo de item: get_value_agent, get_value_simple, etc

Cuando termina de procesar mira a ver si tiene más elementos en la cola.
Si tiene, sigue procesando.
Si no para de procesar, cada 5" (como mínimo), actualiza su título.
Si no tiene otra task, duerme el máximo (1").
Tambien puede que duerma menos, pero no queda claro como lo calcula, func "calculate_sleeptime"


### Metricas a partir de los logs
Keys que procesa el poller:
cat pollers | grep "In get_value()" | cut -d "'" -f 2 | sort | uniq -c



# trap
Sección del código donde decide como procesar cada elemento
