# Logs
Si queremos buscar algo en los logs típicamente haremos:
tail -f zabbix_server.log | grep -v -e "became supported" -e "became not supported" -e "is not suitable for value" -e "sending configuration data to proxy"

De esta manera nos quitamos las típicas trazas recurrentes que posiblemtente no estamos buscando.


Contar número de lineas por hora:
cat zabbix_server.log | grep -e "^\s*[0-9]*:" | awk '{print $1;}' | cut -d ':' -f 2,3 | cut -c 1-11 | uniq -c


# Queues
queue.md


# Audit
Reports > Audit
Para ver quien se ha logeado, si se han metido cambios, etc
