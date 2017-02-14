https://docs.influxdata.com/influxdb/latest/troubleshooting/query_management/

SHOW QUERIES
  nos muetras las query corriendo actualmente

KILL QUERY <qpid>
  mata una de las queries mostradas con el comando anterior



# Limitar queries
Se configura en la sección: [coordinator]

max-concurrent-queries
query-timeout
log-queries-after
max-select-point
max-select-series
max-select-buckets



Traza de log cuando se detecta una query que dura más tiempo que los segundos definidos en log-queries-after

Feb 07 14:26:23 influxdb-maqueta.localdomain influxd[21586]: [W] 2017-02-07T13:26:23Z Detected slow query: SELECT sum(usage_system) FROM cpu (qid: 9, database: dsmctools_telegraf, threshold: 5s) service=query
