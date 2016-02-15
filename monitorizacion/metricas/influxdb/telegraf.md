https://github.com/influxdata/telegraf

Telegraf is an agent written in Go for collecting metrics from the system it's running on, or from other services, and writing them into InfluxDB.

# Instalación
https://github.com/influxdata/telegraf#linux-deb-and-rpm-packages

Bajando el rpm linkado en la web e instalado a mano

Instalado la 0.10.0

yum install telegraf


# Configuración
Por defecto el rpm genera:
/etc/telegraf/telegraf.conf

Tambien  podemos pedir al binario que genere una conf de ejemplo.
Esta conf nos da mucha más opciones configuradas, mas outputs y plugins.
telegraf -sample-config

También se pueden meter configs en:
/etc/telegraf/telegraf.d

## Conf server
[[outputs.influxdb]]
  urls = ["http://10.5.2.180:8086"]
  database = "nombre" # NO poner guiones (-)
  precision = "s"

  username = "adri"
  password = "adri"


# Run
Ver que metricas se generan por stdout y salir:
telegraf -config /etc/telegraf/telegraf.conf -test

## Centos 7
systemctl start telegraf

## Centos 6
service telegraf start


# Plugins
Para ver ayuda de un cierto plugin:

telegraf -usage NOMBRE



# Internals
Si usamos UDP envia tramas de payload 512bytes:
https://github.com/influxdata/influxdb/blob/616da49019703338da893ea6a619beebeb51f755/client/v2/client.go#L21
https://github.com/influxdata/influxdb/blob/616da49019703338da893ea6a619beebeb51f755/client/v2/client.go#L334

Si usamos HTTP:
Envia toda la info que le pasamos a la función Write:
https://github.com/influxdata/influxdb/blob/616da49019703338da893ea6a619beebeb51f755/client/v2/client.go#L354

Parece que telegraf genera un gran array de metricas y se lo pasa a write:
https://github.com/influxdata/telegraf/blob/master/plugins/outputs/influxdb/influxdb.go#L135

Por aqui está como corre el agente:
https://github.com/influxdata/telegraf/blob/master/agent/agent.go

No me queda claro como hace el write y si lo hace de todas las métricas de golpe
