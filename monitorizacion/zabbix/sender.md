https://www.zabbix.com/documentation/3.4/manual/concepts/sender

Zabbix sender is a command line utility that may be used to send performance data to Zabbix server for processing.
Debe existir un "trapper item" que reciba los datos.

zabbix_sender -z zabbix -s "Linux DB3" -k db.connections -o 43
