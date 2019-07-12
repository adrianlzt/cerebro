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


# Zabbix web: Audit, login incorrectos
Reports > Audit
Para ver quien se ha logeado, si se han metido cambios, etc



# Slow queries
Mostrar cuantas están saliendo por minuto
cat zabbix_server.log | grep "slow query" | grep -e "^\s*[0-9]*:" | awk '{print $1;}' | cut -d ':' -f 2,3 | cut -c 1-13 | uniq -c


# Procesos internos
ps -eo args | grep zabbix_serve[r] | less

watch -n 1 'ps -eo args | grep zabbix | grep -v -e idle -e "waiting for"'



# Zabbix-web queries pesadas
Si tenemos un php-fpm ejecutando una TX que dura mucho tiempo, podemos hacer un volcado de memoria del proceso php-fpm y ver que está ejecutando
dump_mem.py 4273 |& strings >& dump.4273.txt
  parece que "gcore", de gdb, nos permite hacer un dump: gcore -o out pid

Mejor con gcore (de gdb). Mirar en debug.md

cat dump.4273.txt | grep -e REMOTE_ADDR -e HTTP_USER_AGENT -e REQUEST_METHOD -e QUERY_STRING -e HTTP_REFERER -e SCRIPT_NAME -e REQUEST_URI -e '"jsonrpc"'
  asi deberiamos poder ver quien nos está pidiendo que, a donde, que POST nos ha hecho, etc
  mirando el "auth" de la petición json podemos ver quien es (tabla session y users)


Si vemos peticiones tipo:
SELECT i.itemid,i.name,i.type,i.value_type,i.units,i.hostid,i.state,i.valuemapid,i.status,i.error,i.trends,i.history,i.delay,i.key_,i.flags FROM items i WHERE i.flags IN (0,4) AND (i.hostid BETWEEN '10118' AND '10133' OR i.hostid BETWEEN '18682' AND '18686' OR i.hostid BETWEEN '18688' AND '18697' OR i.hostid BETWEEN '29766' AND '29771' OR i.hostid BETWEEN '30926' AND '30930' OR i.hostid BETWEEN '31448' AND '31454' OR i.hostid BETWEEN '31785' AND '31790' OR i.hostid BETWEEN '34368' AND '34373' OR i.hostid BETWEEN '34493' AND '34499' OR i.hostid BETWEEN '34515' AND '34521' OR i.hostid BETWEEN '34524' AND '34528' OR i.hostid BETWEEN '37431' AND '37439' OR i.hostid BETWEEN '39810' AND '39820' OR i.hostid BETWEEN '39822' AND '39830' OR i.hostid BETWEEN '39842' AND '39848' OR i.hostid BETWEEN '40901' AND '40913' OR i.hostid BETWEEN '40985' AND '40996' OR i.hostid BETWEEN '41002' AND '41012' OR i.hostid BETWEEN '41024' AND '41029' OR i.hostid BETWEEN '41034' AND '41038' OR i.hostid BETWEEN '41040' AND '41046' OR i.

Es probable que fuese una consulta a latest data que se fue de madre.
Habrá que matar a los php-fpm involucrados.
