# RedHat

yum install net-snmp-utils


Para un server
yum install net-snmp-utils net-snmp

Si queremos que "public" pueda leer todo:
vi /etc/snmp/snmpd.conf
view    systemview    included   .1

Arrancamos el server:
systemctl start snmpd.service
