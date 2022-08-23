https://www.zabbix.com/documentation/6.0/en/manual/concepts/server/ha
https://blog.zabbix.com/build-zabbix-server-ha-cluster-in-10-minutes-by-kaspars-mednis-zabbix-summit-online-2021/18155/

Para Zabbix-web se soporta desde 5.2, podemos arrancar todos los zabbix-web que queramos.
Para zabbix-server desde 6.0, servers activo-pasivo usando la DB como coordinación.

Mirar ha_postgres.md para ver como configurar zabbix-web y zabbix-server para que puedan usar una postgres con primaria y réplica.

# Zabbix-web
Cada server web es independiente (activo-activo), por lo que las cookies son diferentes.
Si ponemos un LB por delante tendrá que tener sticky session (no estoy 100%, no probado).

# Zabbix-server
Desde la versión 6.0, activo-pasivo.

Para activar el HA debemos confiurar estos dos parámetros:
HANodeName=nombreServer
NodeAddress=ipserver:10051

HANodeName será el nombre que usemos en los proxies/agentes para referirnos al server.
NodeAddress es donde conectará el frontend.
