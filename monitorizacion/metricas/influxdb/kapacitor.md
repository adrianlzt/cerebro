https://docs.influxdata.com/kapacitor/v0.2/introduction/getting_started/

Generar alarmas a partir de los datos indexados:
Hacer procesado batch sobre la informacion

# Configuración
Podemos generar un fichero de configuración de ejemplo con:
kapacitord config

Pero es mejor modificar este:
https://github.com/influxdata/kapacitor/blob/master/etc/kapacitor/kapacitor.conf

# Tareas
Se pueden meter muchas definiciones en el mismo fichero .tick.

# API
Kapacitord levanta una api mediante la que se comunica el CLI kapacitor


## Stream
Ej.: https://github.com/influxdata/kapacitor/blob/master/examples/scores/top_scores.tick

high_cpu.tick:
stream
    .from()
        .measurement('cpu_usage_idle')
        .where(lambda: "cpu" == 'cpu-total')
    .alert()
        .info(lambda: TRUE)
        .warn(lambda: "value" > 30)
        .crit(lambda: "value" > 0)
        .log('/tmp/high_cpu.log')

## Batch
Ej.: https://github.com/influxdata/kapacitor/blob/master/examples/error_percent/error_percent.tick

var cup = batch
          .query('select value from "telegraf"."default"."cpu_usage_idle"')
              .every(5s)
              .period(10h)

cup
    .httpOut('pepe')

cup
    .alert()
        .info(lambda: TRUE)
        .log('/tmp/high_cpu.log')


Cada 5s ejecuta esta query:
SELECT value FROM telegraf."default".cpu_usage_idle WHERE time > '2016-01-18T01:40:36.951728593Z' AND time < '2016-01-18T11:40:36.951728593Z'
Todos los resultados, valores de cpu_usage_idle, los escribe como un único evento en el log. También los deja disponibles en la api:
curl http://localhost:9092/api/v1/pibatch/pepe
{"Series":[{"name":"cpu_usage_idle","columns":["time","value"],"values":[["2016-01-18T11:37:53Z",233],["2016-01-18T11:38:03Z",1111]]}],"Err":null}


## Outputs
### http
stream
    .from()
        .measurement('cpu_usage_idle')
        .where(lambda: "cpu" == 'cpu-total')
    .httpOut('VARIABLE')


curl http://localhost:9092/api/v1/NOMBRETASK/VARIABLE
{"Series":[{"name":"cpu_usage_idle","tags":{"cpu":"cpu-total"},"columns":["time","value"],"values":[["2015-12-17T07:49:10Z",33]]}],"Err":null}

Nos mostrará únicamente el último valor. Si queremos mostrar más tendremos que hacer uso de mapReduce


### Alert
https://docs.influxdata.com/kapacitor/v0.2/tick/alert_node/
https://github.com/influxdata/kapacitor/blob/a6374e83925a319878538c57a3ca0a2e96ee293e/pipeline/alert.go

Genera eventos triggered por diferentes valores

### Variables disponibles
ID – the ID of the alert, user defined.
Message – the alert message, user defined.
Time – the time the alert occurred.
Level – one of OK, INFO, WARNING or CRITICAL.
Data – influxql.Result containing the data that triggered the alert.

### Event handlers
#### post
Nos envia a la URL que le digamos el JSON del evento

POST /peito/ HTTP/1.1
Host: localhost:8654
User-Agent: Go-http-client/1.1
Content-Length: 253
Content-Type: application/json
Accept-Encoding: gzip

{"id":"cpu_usage_idle:nil","message":"PEPITO cpu_usage_idle:nil","time":"2015-12-17T07:49:10Z","level":"CRITICAL","data":{"series":[{"name":"cpu_usage_idle","tags":{"cpu":"cpu-total"},"columns":["time","value"],"values":[["2015-12-17T07:49:10Z",33]]}]}}

#### email
#### exec
#### Apps
Slack, VictorOps, PagerDuty

#### .log
Nos mete la traza generada en el fichero que le digamos

Ej.:
{"id":"cpu_usage_idle:nil","message":"cpu_usage_idle:nil is CRITICAL","time":"1970-01-17T19:38:30.38Z","level":"CRITICAL","data":{"series":[{"name":"cpu_usage_idle","tags":{"cpu":"cpu-total"},"columns":["time","value"],"values":[["1970-01-17T19:38:30.38Z",35]]}]}}


## Crear la tarea

kapacitor define -name high_cpu_alert -type stream -tick high_cpu.tick -dbrp telegraf.default

  type: tipo stream o batch
  tick: fichero de instrucciones
  dbrp: base_de_datos.tipo_de_retencion
    Se pueden definir varias

Para batch:
kapacitor define -name pibatch -type batch -tick batch.tick -dbrp telegraf.default

# Listar tareas
kapacitor list tasks

# Activar tarea
kapacitor enable high_cpu_alert

Enviar traza de ejemplo:
curl -i -XPOST 'http://localhost:8086/write?db=telegraf' --data-binary 'cpu_usage_idle,cpu=cpu-total value=13 1450338550000000000'

# Modificar tarea
kapacitor define -name ...
kapacitor reload NOMBRE
  para que cargue la nueva definición

# Borrar tarea
kapacitor delete tasks high_cpu


# Trazas log
Si una task entra en un stream veremos en el log unas trazas del estilo:
[edge:TASK_MASTER|sources->stream] 2016/01/18 10:46:29 D! collect point c: 3789 e: 3789
[edge:high_cpu_alert|stream->stream0] 2016/01/18 10:46:29 D! collect point c: 0 e: 0
[edge:TASK_MASTER|sources->stream] 2016/01/18 10:46:29 D! next point c: 3790 e: 3790
[edge:high_cpu_alert|stream0->stream1] 2016/01/18 10:46:29 D! collect point c: 0 e: 0
[edge:high_cpu_alert|stream->stream0] 2016/01/18 10:46:29 D! next point c: 1 e: 1
[edge:high_cpu_alert|stream1->alert2] 2016/01/18 10:46:29 D! collect point c: 0 e: 0
[edge:high_cpu_alert|stream0->stream1] 2016/01/18 10:46:29 D! next point c: 1 e: 1
[edge:high_cpu_alert|stream1->alert2] 2016/01/18 10:46:29 D! next point c: 1 e: 1

