Podemos usar timescaledb para comprimir las trends.

Si activamos la compresión, https://www.zabbix.com/documentation/6.0/en/manual/appendix/install/timescaledb#timescaledb-compression, será el proceso de housekeeper quien se encarga de la compresión.

Comprobar la configuración en postgres:
select compression_status,db_extension,dbversion_status from config;

compression_status=1 es que está activado.
db_extension debe estar a 'timescaledb'.
dbversion_status es un JSON donde si vemos extension_err_code es que tenemos un error (excepto si está a 1, que no tenemos problemas).

Si queremos ver si timescaledb tiene configurados los jobs de compresión:
select * from timescaledb_information.jobs


Fichero donde se gestiona configurar las compresiones, etc:
src/zabbix_server/housekeeper/history_compress.c
