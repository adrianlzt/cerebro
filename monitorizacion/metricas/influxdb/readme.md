http://influxdb.org/
https://github.com/influxdb/influxdb
https://speakerdeck.com/auxesis/influxdb-making-time-series-fun

Metricas (números) y eventos (texto)

An open-source, distributed, time series, events, and metrics database with no external dependencies.

Sencillo para enviar y recibir métricas desde javascript.
Escrito en go

Van por la 0.0.9 (11/11/2013)

http://obfuscurity.com/2013/11/My-Impressions-of-InfluxDB

They plan to add a feature called continuous queries, which will allow users to "precompute expensive queries into another time series in real-time". At face value this sounds very much like Graphite's carbon-aggregator. However, because you would have the entire query language at your disposal, it has the potential to be much more powerful.

There remain some questions around its potential to scale, as well as general benchmarks. Paul Dix, the founder of Errplane and apparent Influx project lead, says that both clustering and benchmarks are expected to be released in December. A work-in-progress GitHub pull-request is open for tracking the ongoing clustering work. Paul has given some anecdotal numbers of "20k-70k points per second" in the project mailing list.
