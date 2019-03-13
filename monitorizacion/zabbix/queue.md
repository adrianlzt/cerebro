https://www.zabbix.com/documentation/3.4/manual/config/items/queue

The queue displays items that are waiting for a refresh.
Following item types are excluded from the queue:
  log, logrt and event log active Zabbix agent items
  SNMP trap items
  trapper items
  web monitoring items

Es el "termómetro" de como está funcionando zabbix.

Nos agrupan el número de items en cada cola según el tiempo que llevan.

Tabla donde se muestra, por cada tipo de item, si hay items esperando ser ejecutados.
Si esta todo correcto la pantalla debería ser toda verde y con 0's.
Algunos elementos no verdes no deberían ser fuente de preocupación, pero deberíamos mirar porque puede que estén en este estado.

Recordar también mirar la pestaña "Details" y "Overview by proxy"

Administration - Queue
http://zabbix/queue.php




El frontal usa la API interna de zabbix para obtener los datos de las colas.
La función que llama es "queue.get"

Las colas están almacenadas en la memoria, no podemos hacer una consulta SQL para obtenerlas.


"queue.get" lo recibe trapper.c
https://github.com/zabbix/zabbix/blob/ed41431677d3bb4ad05406776e6dfadbc65a2683/src/zabbix_server/trapper/trapper.c#L424
ZBX_GET_QUEUE_OVERVIEW
ZBX_GET_QUEUE_PROXY



echo '{"request":"queue.get","sid":"0256aa0253c253a812f17a7755970baa","type":"overview"}' | nc serverzabbix 10051
  si no tenemos nada encolado para un tipo de datos, no nos devuelve nada.
  Ejemplo de retorno (solo encolados actives y snmp):
  {"response":"success","data":[
    {"itemtype":4,"delay5":0,"delay10":91,"delay30":0,"delay60":0,"delay300":0,"delay600":0},
    {"itemtype":7,"delay5":358,"delay10":1242,"delay30":1244,"delay60":6050,"delay300":3134,"delay600":4129}
  ]}

echo '{"request":"queue.get","sid":"0256aa0253c253a812f17a7755970baa","type":"overview by proxy"}' | nc serverzabbix 10051


Todos los items en la queue
echo '{"request":"queue.get","sid":"0256aa0253c253a812f17a7755970baa","type":"details"}' | nc serverzabbix 10051 > out.json

Sin límite
echo '{"request":"queue.get","sid":"0256aa0253c253a812f17a7755970baa","type":"details", "limit": "100000"}' | nc serverzabbix 10051 > out.json
