# Crear grupo
mkgroup nombre

# Crear user
useradd -d /var/lib/zabbix -g zabbix -c "ZABBIX Daemon"  -s /bin/false zabbix
