# Logs
/var/log/influxdb/influxd.log
fatal error: runtime: out of memory
  Saca esta traza cuando el proceso se suicida por falta de memoria


https://github.com/influxdata/influxdb/pull/6435
[query] 2016/04/20 13:10:04 Detected slow query: SELECT count(value) FROM cpu (qid: 1, database: stress)

