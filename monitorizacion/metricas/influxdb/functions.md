https://docs.influxdata.com/influxdb/v0.10/query_language/functions/

ToDo: https://github.com/influxdata/influxdb/issues/5930


# Mean / Media
SELECT MEAN(water_level) FROM h2o_feet WHERE time >= '2015-08-18T00:00:00Z' AND time < '2015-09-18T17:00:00Z' GROUP BY time(4d)

SELECT mean(bytes_recv) FROM epg."default".net WHERE interface = 'br-ex-mgmt' AND time > now() - 1h GROUP BY time(10s)


Saca una muestra cada 4 días con la media de los valores de esos 4 días.


# Last / Última
Última entrada según el timestamp

# Percentile / Percentil
monitorizacion/metricas/percentiles.md

Sería util que kapacitor pudiese generar unas nuevas entradas con cuantas peticiones 


# Derivative / Derivar
http://lkhill.com/using-influxdb-grafana-to-display-network-statistics/

Si queremos obtener una velocidad a partir de unas métricas que van contando suma de bytes:

SELECT derivative(mean("bytes_recv"), 10s) *-1/8 AS "recv" FROM "net" WHERE "host" =~ /$host$/ AND "interface" =~ /$interfaces$/ AND $timeFilter GROUP BY time(10s), "interface", "host" fill(null)

Poner la columna como bits/s, para ver Mbps.
Si no, estaremos viendo MegaBytes/s, pero de esta manera no es como se suele medir la velocidad.

Esta query sirve si usamos Telegraf con el modulo net.
Por defecto envía las métricas cada 10s, por lo que tenemos que hacer la derivada cada ese tiempo y agrupar también por cada ese tiempo.


# Moving average
https://docs.influxdata.com/influxdb/v0.12/query_language/functions/#moving-average

SELECT MOVING_AVERAGE(<field_key>,<window>) FROM <measurement_name> [WHERE <stuff>]


# Difference
https://docs.influxdata.com/influxdb/v0.12/query_language/functions/#difference
Calcula la diferencia respecto al valor anterior

SELECT DIFFERENCE(<field_key>) FROM <measurement_name> [WHERE <stuff>]
