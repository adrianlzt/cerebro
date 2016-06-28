https://influxdb.com/docs/v0.9/query_language/data_exploration.html

select * from cpu where check = 'cpu_sys' and time > now() - 1h order by time desc

# Database
show databases

select * from DATABASE..CAMPO

Si no ponemos database, usará la que hayamos dicho mediante:
use DATABASE

# Fecha
Si queremos ver el formato de fecha en algo más legible:
precision rfc3339


# Output
Podemos dedicir el formato de output que queremos
format <json|csv|column>

Y ver el json ordenado:
pretty


# Series
Nos muestra para cada medida, que diferentes tipos de cosas tenemos almacenadas.
Por ejemplo, para swap, veremos que hay 4 nodos enviando metricas y que cada uno envia el swapip y el swapout
SHOW SERIES

# Medidas / measurements
Nos muestra las diferentes medidas que tenemos en esta base de datos
SHOW MEASUREMENTS

Borrar medida
DROP MEASUREMENT "anca.pepe.cpu"

# Values
Los valores que pueden estar almacenados en una serie
Si queremos ver los que tenemos:
SHOW FIELD KEYS

SHOW FIELD KEYS FROM "uptime"



# Tags
Tags asociados con cada serie.

Si queremos ver todos los tags por cada measurement:
SHOW TAG KEYS

SHOW TAG VALUES WITH KEY = "environment"
  obtiene todos los posibles valores de la columna environment




# Getting a List of Time Series
show series
-- or this
select * from /.*/ limit 1
  esta dará un error si alguna serie no tiene ningún dato
  l

# Tiempo
select value from response_times where time > '2013-08-12 23:32:01.232' and time < '2013-08-13';

select value from response_times where time > now() - 1h limit 1000;

SELECT "value" FROM "icinga".."cpu" WHERE time > now() - 4h
  esto es: de la base de datos icinga, la metrica cpu

select value from response_times where time > 1388534400s


# Regex
https://docs.influxdata.com/influxdb/v0.9/query_language/data_exploration/#regular-expressions-in-queries

SELECT * FROM /.*temperature.*/
SELECT * FROM h2o_feet WHERE location !~ /.*a.*/

# Multiples series
select * from events, errors;

Get the last hour of data from the two series events, and errors. Here’s a regex example:
select * from /^stats\./i where time > now() - 1h;


# Delete
delete from response_times where time < now() - 1h

delete from /^stats.*/ where time < now() - 7d

delete from response_times where user = 'foo'


# Where
select * from events where state = 'NY';

select * from log_lines where line =~ /error/i;

select * from events where customer_id = 23 and type = 'click';

select * from response_times where value > 500;


# Group By
-- count of events in 10 minute intervals
select count(type) from events group by time(10m);

-- count of each unique type of event in 10 minute intervals
select count(type) from events group by time(10m), type;

-- 95th percentile of response times in 30 second intervals
select percentile(value, 95) from response_times group by time(30s);


# Fill
-- devuelve un valor para cada hora, haya o no datos en ese momento
select count(type) from events group by time(1h) fill(0) where time > now() - 3h


# Merge series - DEPRECATED
http://stackoverflow.com/questions/33264655/merging-time-series-in-influxdb-0-9-x

select count(type) from user_events merge admin_events group by time(10m)


# Join - DEPRECATED
http://stackoverflow.com/questions/33264655/merging-time-series-in-influxdb-0-9-x

-- Return a time series of the combined cpu load for hosts a and b. The individual points will be coerced into the closest time frames to match up.
select hosta.value + hostb.value
from cpu_load as hosta
inner join cpu_load as hostb
where hosta.host = 'hosta.influxdb.orb' and hostb.host = 'hostb.influxdb.org';

# Order / Sort
https://influxdb.com/docs/v0.9/query_language/data_exploration.html#sort-query-returns-with-order-by-time-desc

Ordenar de la fecha más reciente a la más antigua
select * from load order by time DESC

No se permite ordenar por otra cosa que no sea time: https://github.com/influxdata/influxdb/issues/2341

# Operaciones / Funciones
https://docs.influxdata.com/influxdb/v0.9/query_language/functions/

# Borrar
DROP SERIES FROM wo_start WHERE iniciativa = 'ADRI' AND subject = 'Manual'
  no se puede meter en el where ni time ni values

# Continuous Queries
SHOW CONTINUOUS QUERIES


# Ver queries en ejecucción
https://docs.influxdata.com/influxdb/v0.12/troubleshooting/query_management/#list-currently-running-queries-with-show-queries
SHOW QUERIES

# Matar una query
https://docs.influxdata.com/influxdb/v0.12/troubleshooting/query_management/#stop-currently-running-queries-with-kill-query
KILL QUERY x
