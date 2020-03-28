https://github.com/maxhq/zabbix-backup

Script para hacer un backup solo de las tablas de config

Listado de tablas de las que se hace backup y de las que solo se backupea el schema
https://github.com/maxhq/zabbix-backup/blob/master/zabbix-dump#L612
Nos muestra en que versiones están cada tabla.

No funciona con history/trends particionadas, intenta hacer backup de ellas.

pg_dump -Fc -f zabbix_config_$(date +%Y%m%d%H%M).psql \
--exclude-table-data=acknowledges \
--exclude-table-data=alerts \
--exclude-table-data='auditlog*' \
--exclude-table-data='event*' \
--exclude-table-data='history*' \
--exclude-table-data=housekeeper \
--exclude-table-data='problem*' \
--exclude-table-data='task*' \
--exclude-table-data='trends*' \
zabbix

Instalación con 1M de items, 72MB, 24" en hacer el backup

Este comando supone que si tenemos partitions, están en el schema public.
Si no fuese así, tendremos que pasarlo con algo tipo "*.history*" para seleccionar cualquier schema.

CUIDADO! No tengo claro como de fácil sería restaurar datos a partir de un backup de este tipo, donde posiblemente se rompan varias relaciones entre keys (por las tablas excluídas).
Mejor PITR con postgres.
