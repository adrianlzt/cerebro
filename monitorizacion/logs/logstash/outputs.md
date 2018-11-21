Storage: elasticsearch, mongodb, s3, file, etc
Notifications: pagerduty, nagios, zabbix, email, etc
Relay (logstash no es el último del pipeline, se pasa a otro lado): TCP, kafka, redis, rabbitmq, syslog, etc
Metrics: graphite, ganglia, statsd, etc

stdout: para sacar cosas por el standar out. Ej.:
output {
  stdout { codec => dots }
}
Nos saca un punto por evento procesado

Sacar un mensaje por stdout formateado al gusto:
stdout {
  codec => line {
    format => "rate: %{events.rate_1m}"
  }
}


debug: mirar debug.md

mirar stdout.md

mirar test.md para ver como ejecutarlo para probar
