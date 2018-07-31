# Logs
Si queremos buscar algo en los logs típicamente haremos:
tail -f zabbix_server.log | grep -v -e "became supported" -e "became not supported" -e "is not suitable for value" -e "sending configuration data to proxy"

De esta manera nos quitamos las típicas trazas recurrentes que posiblemtente no estamos buscando.


# Queues
queue.md
