https://github.com/influxdata/telegraf
https://docs.influxdata.com/telegraf/v0.10/introduction/getting-started-telegraf/

Telegraf is an agent written in Go for collecting metrics from the system it's running on, or from other services, and writing them into InfluxDB.

# Instalación
https://github.com/influxdata/telegraf#linux-deb-and-rpm-packages

Bajando el rpm linkado en la web e instalado a mano

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

telegraf --config /etc/telegraf/telegraf.conf --config-directory /etc/telegraf/telegraf.d --test

## Centos 7
systemctl start telegraf

## Centos 6
service telegraf start

# Test
telegraf --input-filter logparser config > example.conf
telegraf --config example.conf -test
  run a single telegraf collection, outputing metrics to stdout

# Cache
Telegraf cachea los outputs en caso de que no pueda escribir.
Si se llenan los buffers, va descartando las nuevas métricas.
https://github.com/influxdata/telegraf/issues/802 petición para cachear en disco

metric_buffer_limit: Telegraf will cache metric_buffer_limit metrics for each output, and will flush this buffer on a successful write. This should be a multiple of metric_batch_size and could not be less than 2 times metric_batch_size.



# Jitter
Podemos configurar telegraf para que recolecte los inputs con ligeras variaciones de tiempo y asi evitar un "pico" en el momento de recolección general.
collection_jitter
Cada vez que va a ejecutar la recolección se pone un random sleep entre 0 y collection_jitter.
Por lo tanto, para un interval de 10" y un jitter de 3" se ejecutará:
00, 11, 20, 31, 40, 53, 62, etc




# Plugins
Para ver ayuda de un cierto plugin:

telegraf --usage NOMBRE


## agregar/quitar/modificar tags/fields
https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md#measurement-filtering

name_prefix
name_suffix

solo dejar pasar ciertos measurements:
namepass = ["aaa"]

Quitar ciertos measurements:
namedrop = ["aaa"]

quita ese tag:
tagexclude = ["path"]

Si queremos quitar un tag en un processor, podemos usar el "converter" e intentar convertir la tag a un field que vaya a fallar. La descartará

quita esos fields:
fielddrop = ["usage_guest", "usage_steal"]

solo deja pasar esos fields:
fieldpass = ["inodes*"]

solo dejar pasar ciertos tags:
taginclude = ["cpu"]

dejar pasar solo tags que cumplan cierto key=value
[inputs.disk.tagpass]
  fstype = [ "ext4", "xfs" ]

no dejar pasar metricas con esta tags
[inputs.disk.tagdrop]
  fstype = [ "vfat" ]

agregar tags:
[[inputs.cpu]]
  [inputs.cpu.tags]
    tag1 = "foo"


## elasticsearch
no nos da info detallada de cada índice: https://github.com/influxdata/telegraf/pull/2872
una vez tengamos esa info detallada, hacer un aggregator para sacar la info de un pattern junta, por ejemplo, sacar toda la info de los índices logstash-* como una sola métrica

## mem
La memoria used la calcula (la lib gopsutil) como:
ret.Used = ret.Total - ret.Available

## cpu
Hace uso de la lib gopsutil, que, para la cpu, lee /proc/stat.
Va calculando la diferencia entre dos medidas (la primera ejecucción se descarta)

## filestat
Para obtener si existe un fichero, su tamaño y md5 (opcional).
CUIDADO, si no tenemos permisos en los ficheros no dirá nada, solo veremos que no saca información


## nagios
https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md#nagios

## dig / dns
Nos devuelve tiempos de respuesta del servidor dns

## exec
Ejecuta un programa que debe devolver las métricas en formato inline, graphite o json


## sysctl fs
https://github.com/phemmer/telegraf/blob/7e77be97eb200f5e47691f4bfd62746c535eab85/plugins/inputs/system/LINUX_SYSCTL_FS_README.md
Nos da, entre otras cosas, número de ficheros abiertos, inodos disponibles, etc

## Apache
https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache

[[inputs.apache]]
  urls = ["http://127.0.0.1/server-status?auto"]

## MongoDB
https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mongodb

/etc/telegraf/telegraf.d/mongodb.conf
[[inputs.mongodb]]
  servers = ["127.0.0.1:27017"]

## httpjson
https://github.com/influxdata/telegraf/tree/master/plugins/inputs/httpjson

Hace un get a un endpoint y espera un json con valores que sean métricas.

## json - influxdb
https://github.com/influxdata/telegraf/tree/master/plugins/inputs/influxdb

Como el anterior, pero esperando un formato determinado del json

## net response / check_tcp check_udp
https://github.com/influxdata/telegraf/tree/master/plugins/inputs/net_response

Conecta a un puerto y ve cuanto tiempo tarda en contestar.

## nginx
https://github.com/influxdata/telegraf/tree/master/plugins/inputs/nginx

[[inputs.nginx]]
  ## An array of Nginx stub_status URI to gather stats.
  urls = ["http://localhost/status"]

## ping
envia ping a un server y mide tiempo de respuesta

## procstat
https://github.com/influxdata/telegraf/tree/master/plugins/inputs/procstat

Monitoriza un proceso usando los valores de /proc/PID/...
Si en el regex ponemos "." monitorizará todos los procesos. CUIDADO con el número de series creadas!
Algunas medidas solo las sacará si el user telegraf tiene permisos para leer el /proc/PID (por ejemplo, num_fds, IO, etc). Ejecutar como root si queremos ver todo

/etc/telegraf/telegraf.d/procs.conf 
[[inputs.procstat]]
  user = "icinga"
[[inputs.procstat]]
  pattern = "graphios"


## sensors
https://github.com/influxdata/telegraf/tree/master/plugins/inputs/sensors

Utiliza lm-sensors para obtener información de temperatura, ventiladores, etc

## snmp
Obtiene valores de snmp

Tendremos que cargar el mapeo de nombre de oid a número.

collect = ["interface_speed", "if_number", "if_out_octets"]
aqui ponemos nombre de cosas que vamos a definir mas tarde

Si queremos coger un único valor:
  [[inputs.snmp.get]]
    name = "if_number"
    oid = "ifNumber"

Si hay ese oid es un arbol y solo queremos coger uno:
  [[inputs.snmp.get]]
    name = "interface_speed"
    oid = "ifSpeed"
    instance = "1"

Si queremos coger todo un arbol:
  [[inputs.snmp.bulk]]
    name = "if_out_octets"
    oid = "ifOutOctets"

Este último creará una medida ifOutOctets con un único valor (ifOutOctets) y tags por cada uno de los elementos del arbol

## sysstat
https://github.com/influxdata/telegraf/tree/master/plugins/inputs/sysstat

## http reponse
https://github.com/influxdata/telegraf/tree/master/plugins/inputs/http_response

## Parse logs
https://github.com/influxdata/telegraf/blob/master/plugins/inputs/logparser/README.md
https://www.influxdata.com/telegraf-correlate-log-metrics-data-performance-bottlenecks/

https://github.com/influxdata/telegraf/blob/master/plugins/inputs/tail/README.md
esto hace un tail -f de un fichero y va consumiendo las líneas, que deben estar en formato aceptado por influx

## docker
https://github.com/influxdata/telegraf/tree/master/plugins/inputs/docker
recordar que el socket de docker debe tener permisos de lectura para el user telegraf (crear grupo docker, reiniciar y meter nuestro user en el grupo docker)
Por defecto el endpoint será unix:///var/run/docker.sock



## prometheus
para obtener metricas de servicios que exponen sus métricas via prometheus, por ejemplo etcd




## Github
Puede levantar un puerto donde apuntamos un webhook de github


## windows
Ejemplo de inputs y dashboard de grafana
https://grafana.com/dashboards/1902


# Consumo
Con la instalación básica haciendo pooling cada 10"
  15MB 0.25%

Metiendo procstat para todos los procesos (el resto básico, con pooling cada 10"):
  17.7MB 2.29%
  aunque la memoria seguia creciendo poco a poco
  el consumo de cpu tenia bastante variación

Metiendo procstat para todos los procesos (el resto básico, con pooling cada 30"):
  16.4MB 0.7%


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


# Aggregator & Processor
https://docs.influxdata.com/telegraf/v1.1/concepts/aggregator_processor_plugins/

Plugins que se encuentran entre los inputs y los outputs y nos permiten modificar la información

Los procesadores permiten hacer transformaciones, decoraciones o filtrar.
Los agregadores nos permiten hacer medias, percentiles, min/mas, contar

## basicstats
[[aggregators.basicstats]]
  namepass = [ "procstat_nginx_worker" ]
  drop_original = false
  period = "4s"
  stats = ["count"]

En este ejemplo solo estamos haciendo count de los fields que llegan en la measurement procstat_nginx_worker y eliminado las métricas originales.
Si por ejemplo estamos usando procstat para recolectar varios procesos con el mismo nombre y distintos PID y queremos generar la media/max/min/sum/count de los valores, tendremos que poner un "period" del aggregator que sea menor que el interval-jitter.
La idea es que el aggregator nunca coja más de un grupo de métricas (procstat generará en el mismo instante todas las métricas para el mismo proceso con distintos PIDs).
Si el aggregator no recoge nada, no generará nada.
Si por el contrario ponemos un period mayor, podría suceder que cogiese dos grupos de métricas de prostat, generando un "sum" y un "count" variable dependiendo de las condiciones de carrera


## regex processor
https://github.com/influxdata/telegraf/tree/master/plugins/processors/regex
Nos permite modificar los values de una tag o un field (tambien puede almacenar el valor en un nuevo tag)
Parece que solo funciona cuando el value es una string.
Típico caso, extraer campos de un field con regex para generar uno nuevo.

No funciona con --test


## converter processor
https://github.com/influxdata/telegraf/tree/master/plugins/processors/converter
Cambiar tipos de datos de tag o fields.
Cambiar fields por tags y viceversa


## override processor
https://github.com/influxdata/telegraf/tree/master/plugins/processors/override
nos sirve para cambiar nombres de tags, agregar tags.



# Monitorizar el propio telegraf
Los logs meten dos caracteres para distinguir el tipo de error:
https://github.com/influxdata/telegraf/pull/1838
https://github.com/influxdata/telegraf/blob/master/logger/logger.go#L13

D!   debug
I!   info
W!   warning (añadida a posteriori)
E!   error

Mirar en el siguiente apartado (logparser) para ver como parsear los logs de Telegraf con logparser


# Logparser / grok
Ejemplo de fichero de configuración para hacer pruebas:
[agent]
  interval = "1s"
  flush_interval = "1s"

[[outputs.file]]
  files = ["stdout"]

[[inputs.logparser]]
  files = ["/var/log/rasdaemon.log"]
  from_beginning = true
  [inputs.logparser.grok]
    patterns = ['%{ts-syslog}']
    measurement = "ras_errors"
    timezone = "Europe/Madrid"

probar con:
telegraf -config fichero.conf -debug

Ejemplo de parsers, donde a telegraf solo sacamos el "error":
    patterns = ['%{SYSLOGTIMESTAMP} %{WORD} %{COMM} %{ERROR:error}']
    custom_patterns = '''
COMM (?:rasdaemon\[[0-9]*\]:\s*)
ERROR (?:.*[Ee][Rr]{2}[Oo][Rr].*)
'''


Parseando los propios logs de Telegraf:
[[inputs.logparser]]
  files = ["/var/log/telegraf.log"]

  [inputs.logparser.grok]
    measurement = "telegraf_log"
    patterns = ['\A%{TIMESTAMP_ISO8601:timestamp:ts-rfc3339} %{TELEGRAF_LOG_LEVEL:level:tag}! %{GREEDYDATA:msg}']
    custom_patterns = '''
TELEGRAF_LOG_LEVEL (?:[DIWE]+)
'''




# Debug / Profiling
https://github.com/influxdata/telegraf/blob/master/docs/PROFILING.md

Si queremos obtener un stacktrace del proceso tenemos que matarlo con:
kill -SIGQUIT $(pgrep telegraf)

Ejemplo de una stacktrace de telegraf 1.4.1 funcionando bien.
Plugin de output: influxdb
Plugins de input: inputs.disk inputs.diskio inputs.kernel inputs.mem inputs.processes inputs.swap inputs.system inputs.cpu inputs.procstat inputs.docker inputs.procstat inputs.prometheus inputs.kubernetes inputs.net inputs.netstat inputs.prometheus inputs.procstat inputs.procstat
telegraf.stacktrace (con comentarios)



# Develop
https://github.com/adrianlzt/telegraf/blob/master/CONTRIBUTING.md
https://www.influxdata.com/telegraf-update-1-3/
  How to Write Plugins
https://www.influxdata.com/blog/how-to-write-telegraf-plugin-beginners/?__s=trqwhcsp36pvqhgtigfv
https://www.influxdata.com/blog/building-better-telegraf-plugin/?__s=trqwhcsp36pvqhgtigfv

go get github.com/influxdata/telegraf
cd $GOPATH/src/github.com/influxdata/telegraf
make default
make test-short
Hacer modificaciones
make test-short
O si queremos probar solo uno: go test -short github.com/influxdata/telegraf/plugins/inputs/docker

Hacer RPMs especificando arch, version e iteration:
./scripts/build.py --package --platform=linux --arch=amd64 --version=1.6.0-os --iteration 3

Build para windows amd64:
./scripts/build.py --arch amd64 --platform windows
  genera build/telegraf.exe

Compilar telegraf:
make telegraf


make build
$GOPATH/bin/telegraf --version
$GOPATH/bin/telegraf config > telegraf.conf
$GOPATH/bin/telegraf --config telegraf.conf --test

Tambien, para probar, podemos poner el outputs.file a stdout y opciones para sacar las cosas cada 2 segundos:
interval = "2s"
flush_interval = "2s"
