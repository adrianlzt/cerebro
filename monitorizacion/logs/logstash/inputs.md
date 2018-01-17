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


# Http
input {
  http {
  }
}

curl localhost:8080 -H "Content-Type: application/json" -d '{"some":"field"}'

Si almacenamos el evento en ES veremos algo como:
@version:1 @timestamp:January 17th 2018, 10:23:44.818 host:172.17.0.1 headers.request_method:POST headers.http_version:HTTP/1.1 headers.content_length:16 headers.request_uri:/ headers.http_user_agent:curl/7.57.0 headers.http_accept:*/* headers.request_path:/ headers.content_type:application/json headers.http_host:localhost:8080 some:field _id:TYluA2EB4F4eJ7XqcMr6 _type:doc _index:logstash-2018.01.17 _score:2
