Es necesario activarlo:
https://github.com/influxdb/influxdb/blob/master/etc/config.sample.toml#L73

Necesario definir puerto y database:
[input_plugins]
  # Configure the graphite api
  [input_plugins.graphite]
  enabled = true
  # address = "0.0.0.0" # If not set, is actually set to bind-address.
  port = 2003
  database = "grafito"  # store graphite data in this database
  # udp_enabled = true # enable udp interface on the same port as the tcp interface

Necesitamos crear la bbdd "grafito"

Timestamp: date +%s
echo "region.uu.hostname.server01.cpu 3 1420791394" | nc localhost 2003

Problema, no me está descomponiendo la metrica en tags + nombre
Creo esto aún no está en la version 0.8.8, pero si está en la rama master del github
region.us-west.hostname.server01.cpu -> tags -> region: us-west, hostname: server01, metric name -> cpu
