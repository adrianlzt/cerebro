https://www.zabbix.com/documentation/3.4/manual/concepts/sender

Zabbix sender is a command line utility that may be used to send performance data to Zabbix server for processing.
Debe existir un "trapper item" que reciba los datos (no se puede usar para enviar a otros tipos de datos).

zabbix_sender -z zabbix -s "Linux DB3" -k db.connections -o 43


Libreria sneder en go
https://github.com/adubkov/go-zabbix
