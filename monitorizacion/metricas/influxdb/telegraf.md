https://github.com/influxdata/telegraf

Telegraf is an agent written in Go for collecting metrics from the system it's running on, or from other services, and writing them into InfluxDB.

# Instalación
Bajando el rpm linkado en la web e instalado a mano

Instalado la 0.3.0-beta2


# Configuración
Por defecto el rpm genera:
/etc/opt/telegraf/telegraf.conf

Tambien  podemos pedir al binario que genere una conf de ejemplo.
Esta conf nos da mucha más opciones configuradas, mas outputs y plugins.
/opt/telegraf/versions/0.3.0-beta2/telegraf -sample-config

## Conf server
[[outputs.influxdb]]
  urls = ["http://10.5.2.180:8086"]
  database = "nombre" # NO poner guiones (-)
  precision = "s"

  username = "adri"
  password = "adri"


# Run
Ver que metricas se generan por stdout y salir:
/opt/telegraf/versions/0.3.0-beta2/telegraf -config /etc/opt/telegraf/telegraf.conf -test

# Plugins
Para ver ayuda de un cierto plugin:

/opt/telegraf/versions/0.3.0-beta2/telegraf -usage NOMBRE
