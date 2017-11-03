https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/log_items

Podemos usar el agente de zabbix para monitorizar logs.

Usaremos una regexp para seleccionar lo que queremos buscar.

Una vez hecho el match, podemos elegir almacenar la línea matcheada o solo retorar un campo (para despues poner un trigger asociado a ese valor)
