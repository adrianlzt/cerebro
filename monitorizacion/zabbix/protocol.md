https://www.zabbix.com/documentation/3.4/manual/appendix/protocols/header_datalen
https://www.zabbix.com/documentation/1.8/protocols
https://github.com/zabbix/zabbix/blob/bd849ec61b920dd4a0cfe2cdaa195e6545976d91/frontends/php/include/classes/server/CZabbixServer.php#L182


# Agent
Si poner las cabeceras.

## Solicitud de items que monitorizar
{"request":"active checks","host":"telegraf_zabbix_config_test"}

Respuesta:
{"response":"success","data":[{"key":"telegraf.mem.available","delay":30,"lastlogsize":0,"mtime":0}]}


## Envío de métricas
{"request":"agent data","session":"afe057020ef90887f74c17bfb0163380","data":[{"host":"telegraf_zabbix_config_test","key":"telegraf.mem.available","value":"Unsupported item key.","state":1,"id":1,"clock":1551685560,"ns":343555527}],"clock":1551685565,"ns":376647193}

Respuesta:
{"response":"success","info":"processed: 1; failed: 0; total: 1; seconds spent: 0.000064"}

Zabbix agent chequeará que "response" es "success" (func check_response en src/zabbix_agent/active.c)
En caso de que no sea success, lo único que cambia es que pinta un "NOT OK" en nivel debug (func send_buffer en src/zabbix_agent/active.c) y tambien al final de check_response el mensaje "End of send_buffer():SUCCESS".
La key "info" solo se muestra en nivel debug, no se hace nada con ella. Si no existe se ignora sin dar error.
Por lo tanto un mensaje de respuesta válido es:
{"response":"success"}



# Solicitud interna de zabbix web a zabbix server para conocer el estado de las colas
echo '{"request":"queue.get","sid":"0256aa0253c253a812f17a7755970baa","type":"overview"}' | nc zabbixserver 10051
