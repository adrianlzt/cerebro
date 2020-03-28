Received empty response from Zabbix Agent at [172.17.0.1]. Assuming that agent dropped connection because of access permissions.
  el agente no permite recoger métricas a ese servidor. Mirar config agente parametro Server=


108:20180219:122536.832 cannot send proxy data to server at "192.168.1.95": empty string received
  mensaje visto en un proxy que tenia una versión superior al servidor de zabbix


130276:20200219:184142.048 cannot send list of active checks to "10.1.7.1": host [nombreHostA] not found
  trapper/active.c
  send_list_of_active_checks_json
  Error al enviar lista de checks activos a un agente



No podemos borrar un host, ni quitar el template, cuando tiene muchísimos items (150k) creados por un discovery.
  desde el template, deslinkar el host
  luego borrar todos los items seleccionando las aplicaciones en el host


Al intentar añadir una macro a un template la interfaz web vuelve a la edición de macros sin tener nada.
En los logs de php-fpm aparece:
PHP message: PHP Warning:  Unknown: Input variables exceeded 1000. To increase the limit change max_input_vars in php.ini
https://support.zabbix.com/browse/ZBX-12044



Cannot create item: item with the same key "telegraf.datasource.pool.ActiveCount-percent[{#DATA-SOURCE}]" already exists.
  Puede ser porque no estamos pasando alguna de las macros en la key del prototype item.
  O, como en este caso, porque estamos usando un guión ("-") que no es válido como MACRO.



Zabbix value cache working in low memory mode
mirar cache.md ValueCacheSize



Items con valores en el futuro.
Están detrás de un proxy y son calculated? Seguramente es que el proxy no tiene sincronizada la hora (está en el pasado) y esto genera los values en el futuro.


cannot create IPC key for path [zabbix_agentd.conf] id [l]: [2] No such file or directory
Estamos arrancando con "-c fichero.conf"?
Poner un path completo



Query failed: ERROR: deadlock detected
Podríamos verlo en el zabbix web y zabbix server.
Una razón, no problemática, podría ser un borrado de un template que tarde bastante junto con la llegada de un LLD.
El borrado del template es una TX que accede y borra items.
La llegada del lld actualiza item_discovery.
Puede producirse un deadlock entre ellos.
Terminará con un fallo en zabbix web (habrá que repetir).
O con un fallo en zabbix server que podremos ignorar (no pudo actualizar item_discovery porque se estaban borrado los items).

