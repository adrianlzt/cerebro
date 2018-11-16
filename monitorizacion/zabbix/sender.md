https://www.zabbix.com/documentation/3.4/manual/concepts/sender

CUIDADO! Si la maquina está configurada con un proxy deberemos apuntar al proxy

Zabbix sender is a command line utility that may be used to send performance data to Zabbix server for processing.
Debe existir un "trapper item" que reciba los datos (no se puede usar para enviar a otros tipos de datos).
No hace falta auth.
El puerto por defecto es el 10051 (donde estará escuchando el zabbix server)

zabbix_sender -z zabbix -s "Linux DB3" -k db.connections -o 43

echo "<hostname> <key> <timestamp> <value>" | zabbix_sender -z SERVER -i - -T
echo "<hostname> <key> <value>" | zabbix_sender -z SERVER -i -

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
Los datos de los agentes activos y los traps se tratan de igual manera.
Entran por la función:
recv_agenthistory (processes the received values from active agents and senders)
En el log modo debug podemos encontrar "In recv_agenthistory"

El dato se procesa con:
process_hist_data

