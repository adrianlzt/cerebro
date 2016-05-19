https://docs.influxdata.com/influxdb/v0.12/troubleshooting/query_management/#configuration-settings-for-query-management
max-concurrent-queries
query-timeout
max-select-point
max-select-series
max-select-buckets


# Slow queries
https://github.com/influxdata/influxdb/pull/6435

Para detectar queries pesadas podemos poner la configuración:

[cluster]
  ...
  query-timeout = "5s" # The time within a query must complete before being killed automatically. 0s to disable.
  log-queries-after = "1s"

De esta manera matamos querys muy pesadas y logueamos las que pasen cierto threshold.
Aparecerá en el log este mensaje:

[query] 2016/05/13 14:41:29 Detected slow query: SELECT * FROM cpu LIMIT 10000000 (qid: 5, database: telegraf, threshold: 1s)

