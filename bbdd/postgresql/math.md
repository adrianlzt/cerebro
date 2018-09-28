# Convertir null en cero
zabbix-server=> select COALESCE(NULL,0);
 coalesce
----------
        0

