https://docs.influxdata.com/influxdb/v0.10/query_language/continuous_queries/

CUIDADO! consume bastante CPU. Mejor hacerlo en Kapacitor, así podremos sacarlo a otra máquina en caso de ser necesario y eliminaremos parte de la carga de CPU.


Las CQ solo se aplican a datos posteriores a la creación de la CQ

The time ranges of the CQ results have round-number boundaries that are set internally by the database. There is currently no way for users to alter the start or end times of the intervals.

Solo los admins tienen permisos sobre los CQs.

# Crear
CREATE CONTINUOUS QUERY <cq_name> ON <database_name> [RESAMPLE [EVERY <interval>] [FOR <interval>]] BEGIN SELECT <function>(<stuff>)[,<function>(<stuff>)] INTO <different_measurement> FROM <current_measurement> [WHERE <stuff>] GROUP BY time(<interval>)[,<stuff>] END

RESAMPLE es para definir cada cuanto se ejecutará (EVERY) y/o el intervalo de tiempo que se debe usar.
INTO especifica el nuevo measurement donde se van a meter los datos downsampleados.

Ejemplo:
CREATE CONTINUOUS QUERY cq_30m ON food_data BEGIN SELECT mean(website) AS mean_website,mean(phone) AS mean_phone INTO food_data."default".downsampled_orders FROM orders GROUP BY time(30m) END

That CQ makes InfluxDB automatically and periodically calculate the 30 minute average from the 10 second website order data and the 30 minute average from the 10 second phone order data. InfluxDB also writes the CQ’s results into the measurement downsampled_orders and to the RP default; InfluxDB stores the aggregated data in downsampled_orders forever.

De un measurement (orders) con dos values (phone y website), crea otro measurement (downsampled_orders) con dos values (mean_phone y mean_website)

Podemos enviarlo a la misma bd.measure a otro data retention: ... FROM pepe ... INTO "ultimo_dia".pepe. ...

No crear varias QC que escriban sobre el mismo measurement, porque solo se escribirá una de las funciones. (solucionable ahora que el engine es TSM1?)
https://docs.influxdata.com/influxdb/v0.10/troubleshooting/frequently_encountered_issues/#writing-more-than-one-continuous-query-to-a-single-series


## GROUP BY
Si, ademas de la agrupación por tiempo, en el GROUP BY metemos tags, estas se meterán en el nuevo measurement automaticamente:
2016-02-05T13:08:00Z    hostB   10      1
2016-02-05T13:08:00Z    hostA   8       1

Los tags que queramos conservar deberán ir en el GROUP BY.


## Backreferencing
CQ aplicado sobre muchos measurements.

CREATE CONTINUOUS QUERY elsewhere ON fantasy BEGIN SELECT mean(value) INTO reality."default".:MEASUREMENT FROM /elf/ GROUP BY time(10m) END

Coge todas las measurements que contentan "elf", hace la media de value, y lo mete en la bd reality, en una measurement con el mismo nombre



# Listar

# Modificar

# Borrar
DROP CONTINUOUS QUERY min_max_random ON test



# Ejemplo
Hosts que reportan una metrica, y tres tags (host, fuente y project)

while true; do curl -i -XPOST 'http://localhost:8086/write?db=test' --data-binary "random,host=hostB,fuente=icinga,project=p2 value=$[ ($RANDOM % 10) +1 ]i
random,host=hostB,fuente=graphios,project=p2 value=$[ ($RANDOM % 10) +1 ]i
random,host=hostA,fuente=icinga,project=p1 value=$[ ($RANDOM % 10) +1 ]i
random,host=hostA,fuente=graphios,project=p1 value=$[ ($RANDOM % 10) +1 ]i"; sleep 5; done

Quiero una funcion que me agrege los datos sin tener en cuenta la fuente, pero que mantenga el proyecto y el host.
CREATE CONTINUOUS QUERY min_max_random ON test BEGIN SELECT MAX(value) AS maximo, MIN(value) AS minimo INTO random_agg FROM random GROUP BY time(1m),host,project END



# Problemas
Si tengo una measurement compleja, tipo:
time                    collector       host                    load1   load15  load15_critical load15_min      load15_warning
1454431254000000000     graphios        dsmctools_nfs           0.23    0.02    25              0               10

load1_critical      load1_min       load1_warning   load5   load5_critical  load5_min       load5_warning   project         status
30                  0               15              0.08    25              0               10              dsmctools       OK


Como hago el downsampling?
Por resolver: https://github.com/influxdata/influxdb/issues/5750

Me han dicho que esta en el road map
