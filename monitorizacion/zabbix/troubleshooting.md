# Logs
Si queremos buscar algo en los logs típicamente haremos:
tail -f zabbix_server.log | grep -v -e "became supported" -e "became not supported" -e "is not suitable for value" -e "sending configuration data to proxy" -e "Cannot evaluate expression"

De esta manera nos quitamos las típicas trazas recurrentes que posiblemtente no estamos buscando.


Contar número de lineas por hora:
cat zabbix_server.log | grep -e "^\s*[0-9]*:" | awk '{print $1;}' | cut -d ':' -f 2,3 | cut -c 1-11 | uniq -c


# Queues
queue.md

# Caches
Mirar graph "Zabbix cache usage".
La cache "history write" es la que almacena los datos procesados antes de indexarlos en la bbdd.

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
