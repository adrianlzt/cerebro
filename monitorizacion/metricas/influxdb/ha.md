https://influxdata.com/high-availability/
doc generica


https://github.com/influxdata/influxdb-relay
https://docs.influxdata.com/influxdb/v0.12/high_availability/relay/
doc sobre la solución con influxdb-relay

La idea es meter un load balancer que envie tráfico a uno o varios relays.
Estos relays a su vez escriben esa información en uno o varios servidores de influxdb.
