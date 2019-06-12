https://www.zabbix.com/documentation/3.4/manual/concepts/sender

CUIDADO! Si la maquina está configurada con un proxy deberemos apuntar al proxy

Zabbix sender is a command line utility that may be used to send performance data to Zabbix server for processing.
Debe existir un "trapper item" que reciba los datos (no se puede usar para enviar a otros tipos de datos).
No hace falta auth.
El puerto por defecto es el 10051 (donde estará escuchando el zabbix server)

zabbix_sender -z zabbix -s "Linux DB3" -k db.connections -o 43

echo "<hostname> <key> <timestamp> <value>" | zabbix_sender -z SERVER -i - -T
echo "<hostname> <key> <value>" | zabbix_sender -z SERVER -i -
echo -e 'prueba_0 telegraf.lld.cpu.cpu {"data":[{"{#CPU}":"uno","{#CPU}":"dos","{#CPU}":"tres"}]}\nprueba_0 telegraf.lld.diskio.name {"data":[{"{#NAME}":"uno"}]}' | zabbix_sender -z SERVERZABBIX -i -
  enviar dos LLDs de golpe

Podemos enviar hasta 250 métricas en el mismo mensaje.
Tras enviar el mensaje el servidor zabbix cierra la conex (no podemos reutilizar la conex para enviar varios paquetes de métricas)

La hora de la métrica trap será la hora a la que llegue al servidor
https://support.zabbix.com/browse/ZBXNEXT-2476
Haciendo pruebas con la lib de go-zabbix, puedo definir la hora que yo quiera y será la que se almacene.
Tambien puedo enviar métricas en el pasado (más antiguas que la última), o enviar dos métricas para la misma fecha (se muestran dos curvas en la gráfica con una tercera linea haciendo la media)


Libreria sneder en go
https://github.com/adubkov/go-zabbix

Python
https://github.com/adubkov/py-zabbix
https://github.com/jbfavre/python-zabbix

Varios lenguajes:
https://github.com/hengyunabc/zabbix-sender
https://github.com/holidayextras/node-zabbix-sender
https://github.com/dominikschulz/Zabbix-Sender
https://github.com/englishm/zabbix_send


# Formato
https://www.zabbix.com/documentation/1.8/protocols

echo '{"request":"queue.get","sid":"0256aa0253c253a812f17a7755970baa","type":"overview"}' | nc zabbixserver 10051


Se envia un formato binario con un json dentro

Envio (legible, copiado desde wirehsark):
  ZBXD#
  {
    "request":"sender data",
    "data":[
      {"host":"archer","key":"telegraf.dns_query.query_time_ms[archer][A][127.0.0.1]","value":"0.410375","clock":1519043805},
      {"host":"archer","key":"telegraf.dns_query.query_time_ms[archer][A][127.0.0.1]","value":"0.277847","clock":1519043805}
    ],
    "clock":1519043805
  }

Respuesta (legible):
{"response":"success","info":"processed: 2; failed: 0; total: 2; seconds spent: 0.000268"}



# Internal
## 1. Recepción de los datos TCP
Cada trapper escucha en un bucle for por nuevas conex tcp: zbx_tcp_accept

Dentro de esa función:
Hace "select" para escuchar en todos los sockets abiertos (sock_set) por alguno que tenga nuevos datos.
Cuando encuentra uno con datos, hace un accept sobre ese socket.
Lee el primer byte, para saber si es una conex TLS (primer byte = 0x16).
En caso TLS, ejecuta zbx_tls_accept para comprobar que la conex es válida y gestionar el handshake y configuración del socket.

En este punto, el trapper ya tiene una conexión, de la que aún no se ha leído nada (el primer byte leído para saber si es TLS se hace de manera que el siguiente recv lo vuelve a leer)

Luego se ejecuta:
process_trapper_child
->
zbx_tcp_recv_to
#define     zbx_tcp_recv_to(s, timeout)     SUCCEED_OR_FAIL(zbx_tcp_recv_ext(s, 0, timeout))
zbx_tcp_recv_ext (Purpose: receive data)

Esta función usa zbx_tcp_read para leer datos del socket. Se encarga de leer TLS/no-TLS.
Para no-TLS usa ZBX_TCP_READ, que es un define sobre la syscall recv, con flags=0.
Para setear el timeout usan el método de SIGALRM.

En esta función (zbx_tcp_recv_ext) se realiza un lioso análisis para saber si el mensaje recibido cumple con lo que se espera.
https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/src/libs/zbxcomms/comms.c#1654
Lo que se va haciendo es ir leyendo el protocolo: https://www.zabbix.com/documentation/4.0/manual/appendix/protocols/header_datalen
Primero la header, luego version, data length y datos

Si zbx_tcp_recv_to termina bien, se ejecuta process_trap.
Aqui se mira que tipo de petición nos están enviando, un trapper, solicitar configuración, datos sobre las colas, etc
Cada una llama a su función.

Para trappers o agent active, se llama a recv_agenthistory (mirar siguiente sección)


## Procesado de trappers / agent active
En lld.md trazas de que hace un trap al procesar un lld enabled o disabled.

Ejemplo de logs debug para la llegada de un simple item sin macros ni lld:
  __zbx_zbx_setproctitle() title:'trapper #1 [processing data]'
  trapper got '{"request":"sender data","data":[{"host":"test","key":"test","value":"1"}]}'
  In recv_agenthistory()
  In process_hist_data()
  In process_mass_data()
  In substitute_simple_macros() data:EMPTY
  End of process_mass_data()
  End of process_hist_data():SUCCEED
  In zbx_send_response()
  zbx_send_response() '{"response":"success","info":"processed: 1; failed: 0; total: 1; seconds spent: 0.000105"}'
  End of zbx_send_response():SUCCEED
  End of recv_agenthistory()
  __zbx_zbx_setproctitle() title:'trapper #1 [processed data in 0.000274 sec, waiting for connection]'


Los datos de los agentes activos y los traps se tratan de igual manera (en zabbix 4 creo que esto cambia ligeramente, para comprobar que si un item es active, solo pueda recibir datos que tenga la header AGENT DATA, y la misma comprobación para los trapper)
Entran por la función:
recv_agenthistory (processes the received values from active agents and senders)
En el log modo debug podemos encontrar "In recv_agenthistory"

Se procesa el dato y se envia la respuesta al cliente:

process_hist_data (process values sent by proxies, active agents and senders)
  se van pasando los elementos de "data" en grupos de 256 elementos a process_mass_data
  process_mass_data (process new item value)
    se obtienen los items de la cache de configuración (DCconfig_get_items_by_keys)
    se skipean las disabled, host disabled, que no pertenezcan al proxy adecuado, que estén en mantinimiento, o que no sean trapper o agent active.
    los trappers, se les sustituye las macros (substitute_simple_macros) y se comprueba se la ip se puede comunicar (zbx_tcp_check_security)
    si el item no está soportado, se marca como ZBX_NOTSUPPORTED
    se almacena: dc_add_history
    dc_add_history (add new value to the cache)
      para los not supported, un short circuit: dc_local_add_history_notsupported
      si es un lld: lld_process_discovery_rule (mirar lld.md)
      se almacena cada tipo de dato con su función particular
      dc_local_add_history_dbl (float)
      dc_local_add_history_uint (int)
        se coje un slot en la local history cache y se almacena el dato (reducido para ejemplificar como lo hace)
        item_value = dc_local_get_history_slot();
          si la local history cache llega a los 256 elementos, se hace un flush dc_flush_history (mirar más abajo como trabaja)
        item_value->itemid = itemid;
        item_value->value_type = ITEM_VALUE_TYPE_UINT64;
        item_value->state = ITEM_STATE_NORMAL;
        item_value->value.value_uint = value_orig;
      dc_local_add_history_str
      dc_local_add_history_text
      dc_local_add_history_log

    dc_requeue_items, creo que para mover items entre un/reachable
    dc_flush_history
      hc_add_item_values (adds item values to the history cache)
        se itera por cada value llamando a hc_clone_history_data
        hc_clone_history_data (clones item value from local cache into history cache)
          no entiendo muy bien que hace esto. Hace un malloc para coger memoria, pero solo si lo había hecho ya antes.
          yo solo veo que coge memoria y copia los valores, pero no que los esté metiendo en ningún sitio.
          y parece que los siguiente valores pisan los valores antiguos
          el data donde se almacena los datos es zbx_hc_data, que contiene un puntero al siguiente elemento.
          se aumentan los contadores cache->stats.history_counter y el que toque según tipo de dato, por ejemplo cache->stats.history_uint_counter
        si el history cache está lleno se saca mensaje debug (en el trapper): "History buffer is full. Sleeping for 1 second"
        se busca si tenemos el item ya en la history cache (cache->history_items), si no se inserta (zbx_hashset_insert_ext)
          esto del hashset parece que es un parecido a un map[]
          si no existía se llama a hc_queue_item (put back item into history queue), &cache->history_queue
          estos items son una lista doble enlazada (tail y head) con el itemid y el status
      cache->history_num += item_values_num
zbx_send_response

La cache:
typedef struct
{
  zbx_hashset_t   trends;
  ZBX_DC_STATS    stats;

  zbx_hashset_t   history_items;
  zbx_binary_heap_t history_queue;

  int     history_num;
  int     trends_num;
  int     trends_last_cleanup_hour;
}
ZBX_DC_CACHE;




Luego parece que hay una función que resuelve las macros de cada item que venga en el array de traps: substitute_simple_macros

En caso de que el trap procesado sea un lld veremos:
In lld_process_discovery_rule() itemid:404200
...
End of lld_process_discovery_rule()

Para el resto de valores el debug no mostrará nada (veremos una línea de "substitute_simple_macros" por cada trap analizado)


Termina cuando contesta al cliente (zbx_send_response) y pone:
End of recv_agenthistory()

Luego, si se queda sin nada que hacer, pondrá el título (__zbx_zbx_setproctitle) o si no, seguirá con el siguiente item (y pondrá el título una vez cada 5")

Cuando un trapper recibe datos veremos una linea como:
  2250:20181121:081646.349 trapper got '{"request":"sender data","dat...



