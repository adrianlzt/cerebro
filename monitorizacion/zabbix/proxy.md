https://www.zabbix.com/documentation/3.4/manual/concepts/proxy

Zabbix proxy is a process that may collect monitoring data from one or more monitored devices and send the information to the Zabbix server, essentially working on behalf of the server. All collected data is buffered locally and then transferred to the Zabbix server the proxy belongs to.

Zabbix proxy requires a separate database.

Para configurar un proxy:
  - En el server zabbix ir a Administration > Proxies y crear el proxy
    Active quiere decir que el proxy envia la info al server
    Tenemos que especificar que hosts pasarán por este proxy (aquí o en la conf del host)

  - Levantar un proxy
    docker run --name some-zabbix-proxy-sqlite3 -it -e ZBX_HOSTNAME=archerProxy -e ZBX_SERVER_HOST=192.168.1.95 -e ZBX_DEBUGLEVEL=3 -p 10051:10051 zabbix/zabbix-proxy-sqlite3:latest
    Escucha peticiones en el puerto 10051 y las reenvia al server


# Internals
Info que envia el proxy al server tras recibir un trap:

ZBXDV
{
	"request":"history data",
	"host":"archerProxy",
	"data":[
	  {"host":"archer","key":"telegraf.dns_query.query_time_ms[archer][A][127.0.0.1]","clock":1519043805,"ns":0,"value":"0.410375"},
	  {"host":"archer","key":"telegraf.dns_query.query_time_ms[archer][A][127.0.0.1]","clock":1519043805,"ns":1,"value":"0.277847"}
	],
	"clock":1519043806,
	"ns":207875347
}


