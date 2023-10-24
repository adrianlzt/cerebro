Podemos usar timescaledb para comprimir las trends.

Si activamos la compresión, https://www.zabbix.com/documentation/6.0/en/manual/appendix/install/timescaledb#timescaledb-compression, será el proceso de housekeeper quien se encarga de la compresión.

Comprobar la configuración en postgres:
select compression_status,db_extension,dbversion_status from config;

compression_status=1 es que está activado.
db_extension debe estar a 'timescaledb'.
dbversion_status es un JSON donde si vemos extension_err_code es que tenemos un error (excepto si está a 1, que no tenemos problemas).

Si queremos ver si timescaledb tiene configurados los jobs de compresión:
select * from timescaledb_information.jobs
select hypertable_name,max_runtime,config,next_start from timescaledb_information.jobs where proc_name = 'policy_compression';

compress_after=612000 son 7d de compress_older más 2h que mete de margen.

Parece que ese valor es el de la tabla config.compress_older


Para poder comprimir las tablas, al no tener un campo tipo "date", tiene que crearse una función que devuelva now()
con el formato de la columna que almacena la fecha.
Zabbix crea la función: zbx_ts_unix_now (definida en la macro ZBX_TS_UNIX_NOW_CREATE)
  create or replace function zbx_ts_unix_now() returns integer language sql stable as $$ select extract(epoch from now())::integer $$;


Y la asigna con:
select set_integer_now_func('TABLA', 'zbx_ts_unix_now', true)

Podemos consultar la asignación en:
SELECT * from timescaledb_information.dimensions;


Para activar la compresión ejecuta, para todas las tablas history y trends:
alter table trends set (timescaledb.compress,timescaledb.compress_segmentby='itemid',timescaledb.compress_orderby='clock');
alter table trends_uint set (timescaledb.compress,timescaledb.compress_segmentby='itemid',timescaledb.compress_orderby='clock');
alter table HISTORY_NOMBRE_TABLA set (timescaledb.compress,timescaledb.compress_segmentby='itemid',timescaledb.compress_orderby='clock,ns');

Se puede configurar la configuración con:
select * from timescaledb_information.compression_settings;




Fichero donde se gestiona configurar las compresiones, etc:
src/zabbix_server/housekeeper/history_compress.c
