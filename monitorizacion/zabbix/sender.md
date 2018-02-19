https://www.zabbix.com/documentation/3.4/manual/concepts/sender

Zabbix sender is a command line utility that may be used to send performance data to Zabbix server for processing.
Debe existir un "trapper item" que reciba los datos (no se puede usar para enviar a otros tipos de datos).
No hace falta auth.
El puerto por defecto es el 10051 (donde estará escuchando el zabbix server)

zabbix_sender -z zabbix -s "Linux DB3" -k db.connections -o 43

Podemos enviar hasta 250 métricas en el mismo mensaje.
Tras enviar el mensaje el servidor zabbix cierra la conex (no podemos reutilizar la conex para enviar varios paquetes de métricas)

La hora de la métrica trap será la hora a la que llegue al servidor
https://support.zabbix.com/browse/ZBXNEXT-2476


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
Se envia un formato binario con un json dentro

Envio (legible):
{"request":"sender data","data":[{"host":"AdriTestHostLDD","key":"cpu","value":"1.22","clock":1518775242},{"host":"AdriTestHostLDD","key":"status","value":"OK","clock":1518775242}],"clock":1518775242}

Respuesta (legible):
{"response":"success","info":"processed: 2; failed: 0; total: 2; seconds spent: 0.000268"}
