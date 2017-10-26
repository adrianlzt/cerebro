https://www.elastic.co/guide/en/logstash/5.6/input-plugins.html


Lo tipico es leer de un socket TCP/UDP o de un fichero.

También syslog/rsyslog

Para large clusters: kafka, rabbitmq, redis

Se puede usar stdin para hacer tests.

twitter, busca keywords, etc

email (IMAP)

lumberjack, usado como logstash-forwarder

amazon s3, gelf, collectd, ganglia, sqs, varnishlog, etc


Cada 60" envia una traza
heartbeat {
  interval => 60
  type => "heartbeat"
}
{"message":"ok","host":"20c124d0711f","@version":"1","@timestamp":"2015-06-12T13:41:34.781Z","type":"heartbeat"}



# Genera trazas aleatorias
input {
  generator {
    #count => 10 # envia 10 trazas y termina
  }
}
Genera mesajes "Hello world!"
Se puede cambiar con
message => "lo que quieras poner"
o
lines => [
  "linea 1",
  "linea 2"
]
Si no limitamos con count enviará esas lineas continuamente.
count => 1, es enviar todas las líneas una vez
