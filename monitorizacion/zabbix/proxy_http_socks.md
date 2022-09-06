Si necesitamos que la comunicación agente->server|proxy o proxy->server sea mediante un proxy http o socks tenemos dos alternativas.

Una es usar socksify (dante) para, de manera transparente a zabbix, encapsular las conexiones mediante el proxy.
Necesitaremos configurarlo a nivel del SO:
/etc/ld.so.preload
/usr/local/lib/libdsocks.so

Otra opción (no probada) es este proyecto: https://bitbucket.org/sivann/zabbix_http_gateway/src/master/
En el agente/proxy levanta un python que escucha en el puerto 10051 y lo envía al zabbix-server.
En el lado de zabbix-server habremos levantado un nginx con php, que recogerá esas peticiones y las reescribirá al puerto 10051 del servidor.
En este caso solo vale para proxies http.
