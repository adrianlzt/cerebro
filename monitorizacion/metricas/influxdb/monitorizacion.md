https://www.influxdata.com/how-to-use-the-show-stats-command-and-the-_internal-database-to-monitor-influxdb/
https://docs.influxdata.com/enterprise/latest/troubleshooting/internal_statistics/

influx -username admin -password adminFLUX -execute 'show stats' | less
influx -username admin -password adminFLUX -execute 'show diagnostics' | less


# Logs
A partir de influxdb 1.1 se logea por defecto contra journald (en sistemas que tengan systemd)
Usan go.uber.org/zap para loggar
https://github.com/influxdata/influxdb/blob/91ee34b111f2034ec9456a6ce391b470d69e3216/cmd/influxd/run/server.go#L143

Parece que los logs siguen el esquema de poner entre corchetes la severidad:
[I] -> Info   <- muchos errores los capturan y los echan por aqui, entiendo que no son importantes
[W] -> Warning   <- para logar slow queries
[E] -> Error
[P] -> Panic
[F] -> Fatal  <- esta es la que mas usan

/var/log/influxdb/influxd.log
fatal error: runtime: out of memory
  Saca esta traza cuando el proceso se suicida por falta de memoria


Traza interesante que vigilar, las slow queries, si lo tenemos activado
https://github.com/influxdata/influxdb/pull/6435
Feb 07 14:39:47 influxdb-maqueta.localdomain influxd[22578]: [W] 2017-02-07T13:39:47Z Detected slow query: SELECT sum(usage_system) FROM cpu (qid: 4, database: dsmctools_telegraf, threshold: 3s) service=query

