Ver estado general de los procesos internos:
ps -eo args | grep zabbix_serve[r] | less


poller:
  obtiene datos de agentes pasivos
  realiza los calculated items
  ejecuta tambien los simple checks?
