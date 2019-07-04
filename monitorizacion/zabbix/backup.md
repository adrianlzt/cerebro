https://github.com/maxhq/zabbix-backup

Script para hacer un backup solo de las tablas de config

No funciona con history/trends particionadas, intenta hacer backup de ellas.

pg_dump -Fc -f zabbix_config_$(date +%Y%m%d%H%M).psql --exclude-table-data=acknowledges --exclude-table-data=alerts --exclude-table-data=auditlog --exclude-table-data=auditlog_details --exclude-table-data=event_recovery --exclude-table-data=event_tag --exclude-table-data=problem --exclude-table-data=problem_tag --exclude-table-data=task --exclude-table-data=task_close_problem --exclude-table-data='*.events*' --exclude-table-data='*.history*' --exclude-table-data='*.trends*' --exclude-table-data=housekeeper

Instalación con 1M de items, 72MB, 24" en hacer el backup
