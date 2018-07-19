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

Administration - Queue
http://zabbix/queue.php


