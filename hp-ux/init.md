Scripts en /sbin/
Se suele hacer un source de todo /etc/rc.config
Esto hace un source de /etc/rc.config.d/* /etc/TIMEZONE

En esos ficheros se puede bloquear el arranque:
ZABBIXD=1
  a 0 no lo dejaría arrancar

A parte se ponen los links
/sbin/rc3.d/S991zabbix_agentd
/sbin/rc2.d/K15zabbix_agentd


Arrancar un servicio:
/sbin/init.d/zabbix_agentd start


# Logs
Ls logs del último arranque se guardan en
/etc/rc.log

El anterior en:
/etc/rc.log.old

Mensaje de inicio de arranque:
HP-UX Start-up in progress

Mensaje de inicio de parado:
System shutdown in progress
