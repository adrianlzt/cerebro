# Logs
Si queremos buscar algo en los logs típicamente haremos:
tail -f zabbix_server.log | grep -v -e "became supported" -e "became not supported" -e "is not suitable for value" -e "sending configuration data to proxy" -e "Cannot evaluate expression"

De esta manera nos quitamos las típicas trazas recurrentes que posiblemtente no estamos buscando.


Contar número de lineas por hora:
cat zabbix_server.log | grep -e "^\s*[0-9]*:" | awk '{print $1;}' | cut -d ':' -f 2,3 | cut -c 1-11 | uniq -c


# Queues
queue.md

Agente zabbix configurado como pasivo (sin valor en ServerActive) en su config pero como activo en la config del server?
El Hostname configurado en la config del agente zabbix no es el mismo que en la config del server? Mayusculas/minúsculas?

# Caches
Mirar graph "Zabbix cache usage".
La cache "history write" es la que almacena los datos procesados antes de indexarlos en la bbdd.

Items/sec procesados por los history syncers:
ps -ef | grep history | egrep -o "synced [0-9]* .* sec" | cut -d ' ' -f 2,5 | tr ' ' '/' | xargs echo | tr ' ' '+' | bc

Lag de los datos de la bbdd respecto al tiempo real (Solo cojemos los items activos calculated, que los tenemos a 1m, comprobar con explain que no es muy cara la query):
select ROUND(EXTRACT(EPOCH FROM now()))-clock AS lag from history where itemid IN ( select itemid from items,hosts where items.hostid=hosts.hostid and items.value_type=0 and items.type=15 and items.state=0 and items.status = 0 and items.flags=0 and hosts.name='NOMBRESERVERZABBIX') order by clock desc limit 1;


# Proxies
Tenemos?
Mirar "Problema overflow" en proxy.md


# Audit
Reports > Audit
Para ver quien se ha logeado, si se han metido cambios, etc



# Slow queries
Mostrar cuantas están saliendo por minuto
cat zabbix_server.log | grep "slow query" | grep -e "^\s*[0-9]*:" | awk '{print $1;}' | cut -d ':' -f 2,3 | cut -c 1-13 | uniq -c


# Procesos internos
ps -eo args | grep zabbix_serve[r] | less

watch -n 1 'ps -eo args | grep zabbix | grep -v -e idle -e "waiting for"'
