https://github.com/influxdata/influxdb/tree/master/services/graphite

Se pueden poner varias veces "measurement":
servers.localhost.cpu.cpu0.user
  Template: .host.measurement.cpu.measurement
  Output: measurement = cpu.user tags = host=localhost cpu=cpu0

Si enviamos varias metricas con el mismo al mismo measurement se pisan.
Hace falta configurar el engine a tsm1



[[graphite]]
  enabled = true
  database = "graphite"
  bind-address = ":2003"

  templates = [
     "sensu.metric.* ..measurement.host.interface.field",

     # default template. Ignore the first graphite component "servers"
     ".measurement*",
  ]

echo "sensu.metric.net.server0.eth0.rx_dropped 0 1444234982" > /dev/tcp/10.95.82.180/2003


#5562, #5419: Graphite: Support matching tags multiple times Thanks @m4ce



> select * from net
name: net
---------
time                    host    interface       rx_dropped
1444234982000000000     server0 eth0            0

