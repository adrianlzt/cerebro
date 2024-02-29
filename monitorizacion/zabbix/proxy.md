https://www.zabbix.com/documentation/3.4/manual/concepts/proxy

Zabbix proxy is a process that may collect monitoring data from one or more monitored devices and send the information to the Zabbix server, essentially working on behalf of the server. All collected data is buffered locally and then transferred to the Zabbix server the proxy belongs to.

Active proxy:  proxy -> server (el proxy envia datos, ProxyMode=0)
Passive proxy: proxy <- server (el server hace poll al proxy)

Zabbix proxy requires a separate database. Can create SQLite DB automatically. Don't use the same DB for proxy as server
Can buffer data in case of communication problems

Para configurar un proxy:
  - En el server zabbix ir a Administration > Proxies y crear el proxy
    Active quiere decir que el proxy envia la info al server
    Tenemos que especificar que hosts pasarán por este proxy (aquí o en la conf del host)

  - Levantar un proxy
    docker run --name some-zabbix-proxy-sqlite3 -it -e ZBX_HOSTNAME=archerProxy -e ZBX_SERVER_HOST=192.168.1.95 -e ZBX_DEBUGLEVEL=3 -p 10051:10051 zabbix/zabbix-proxy-sqlite3:latest
    Escucha peticiones en el puerto 10051 y las reenvia al server

Parámetros de conf para proxies activos:
  Hostname must match proxy name as configured in the frontend
  ProxyOfflineBuffer controls for how long data is kept locally if proxy can't contact server (one hour by default)
  ProxyLocalBuffer allows to preserve data in proxy database for later processing
  ConfigFrequency controls how often proxy requests configuration information from Zabbix server
    cada vez que se solicita la información se loguea un mensaje en el proxy:
      received configuration data from server at "nombreServer", datalen 12721769
    y tambien en el server:
      sending configuration data to proxy "nombreProxy" at "IP.PROXY", datalen 12721769
  DataSenderFrequency controls how often data is sent to Zabbix server
  HeartbeatFrequency makes proxy contact Zabbix server even if there is no new data to transmit

Parámetros de conf para proxiex pasivos:
  StartProxyPollers controls how many pollers contact proxies
  ProxyConfigFrequency – how often Zabbix server sends configuration changes to passive proxies
  ProxyDataFrequency – how often data is requested from passive proxies


# Problema con muchos hosts/items
Los proxies tienen un tamaño máximo de configuración que puede sincronizar.
Si tenemos muchos hosts y/o items puede dejar de funcionar.
Salta un mensaje de error en el log.



# Problemas overflow
when you have some Zabbix server downtime, proxies are accumulating data, and when Zabbix server comes back online, they will send all accumulated data immediately, which will go to history cache and overload history syncers, which must write the missing data to the DB. This will cause much higher NVPS rate than normal.
24222:20190626:182125.561 Uncompressed message size 184049038 from NOMBREPROXY exceeds the maximum size 134217728 bytes. Message ignored.
https://support.zabbix.com/browse/ZBXNEXT-4920


# Almacenamiento de datos
Almacena datos en la tabla proxy_history.


# Errores

Error cuando ponemos un PSK identity incorrecto:
failed to accept an incoming connection: from 172.16.0.253: TLS handshake set result code to 1: file ssl/t1_lib.c line 3266 func tls_choose_sigalg: error:0A000076:SSL routines::no suitable signature algorithm: TLS write fatal alert "handshake failure"

Error cuando la PSK key es incorrecta:
failed to accept an incoming connection: from 172.16.0.253: TLS handshake set result code to 1: file ssl/statem/extensions.c line 1603 func tls_psk_do_binder: error:0A0000FD:SSL routines::binder does not verify: TLS write fatal alert "illegal parameter"


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



## Código

### Función sincronización con el master
ZBX_THREAD_ENTRY(proxyconfig_thread, args)
  process_configuration_sync
    process_proxyconfig
      DCsync_configuration
      DCupdate_hosts_availability



### Como se ingesta un LLD
Por ejemplo, envíamos:
zabbix_sender -z 127.0.0.1 -s hostlld -k lld -o '{"data":[{"{#VAR}": "abc"}]}'

No estoy seguro si este es el camino. Parece el del zabbix_server, temo que en algún momento no ví un "desvío" para cuando es un proxy.

Lo recibe un trapper del proxy -> src/zabbix_server/trapper/trapper.c
recv_senderhistory
    process_sender_history_data
        process_client_history_data
            parse_history_data
            process_history_data
                process_history_data_value
                    zbx_preprocess_item_value

Al final, en algún punto, se termina almacenando la información en alguna memoria interna.
Desde ahí lo coje el history syncer y lo almacena en la tabla proxy_history (función DCmass_proxy_add_history).

### Como se envían los datos
Cada DataSenderFrequency, 1s por defecto, el proxy hace una query a la bd para obtener los items que debe enviar:

get_host_availability_data
proxy_get_hist_data
  proxy_get_lastid: select nextid from ids where table_name='proxy_dhistory' and field_name='dhistory_lastid'
  proxy_get_history_data
    select id,itemid,clock,ns,timestamp,source,severity,value,logeventid,state,lastlogsize,mtime,flags from proxy_history where id>6 order by id limit 1000
    Ese "id>6" será el valor que tenga almacenado en proxy_history.history_lastid (func proxy_get_lastid).
    previamente un trapper, por ejemplo, habrá insertado datos. Ejemplo de un LLD:
        insert into proxy_history (itemid,clock,ns,value) values (28877,1689850664,498430889,'{"data":[{"{#VAR}": "abc"}]}');
proxy_get_dhis_data (discovery)
proxy_get_areg_data (autoregistration)
