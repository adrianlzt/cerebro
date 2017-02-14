Mathematics across measurements
https://github.com/influxdata/influxdb/issues/3552


# Moving Average
https://docs.influxdata.com/influxdb/v1.1/query_language/functions/#moving-average
Returns the moving average across a window of consecutive chronological field values for a single field. The field type must be int64 or float64.


# Holt-Winters
https://docs.influxdata.com/influxdb/latest/query_language/functions/#holt-winters
Predict when data values will cross a given threshold.
Compare predicted values with actual values to detect anomalies in your data.

SELECT HOLT_WINTERS(FUNCTION(<field_key>),<N>,<S>) FROM <measurement_name> WHERE <stuff> GROUP BY time(<interval>)[,<stuff>]
SELECT HOLT_WINTERS_WITH_FIT(FUNCTION(<field_key>),<N>,<S>) FROM <measurement_name> WHERE <stuff> GROUP BY time(<interval>)[,<stuff>]




# Suma cumulativa
SELECT cumulative_sum(mean(value) FROM cpu WHERE time >= now() - 10m GROUP BY time(1m)

Va sumando el nuevo valor al anterior
cpu value=2 0
cpu value=4 10
cpu value=6 20

> SELECT cumulative_sum(value) FROM cpu
time    value
----    -----
0       2
10      6
20      12




# Muestras / random
SELECT sample(n, 2) FROM cpu
  devuelve dos métricas cualesquiera de cpu


# Moda
https://docs.influxdata.com/influxdb/v1.1/query_language/functions#mode

SELECT MODE(<field_key>) FROM <measurement_name> [WHERE <stuff>] [GROUP BY <stuff>]
devuelve el valor más repetido
