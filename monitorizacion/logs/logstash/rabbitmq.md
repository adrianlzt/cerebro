https://www.elastic.co/guide/en/logstash/current/plugins-outputs-rabbitmq.html

Parece que con este plugin solo se puede configurar un servidor de rabbit
https://github.com/logstash-plugins/logstash-output-rabbitmq/blob/master/lib/logstash/outputs/rabbitmq/bunny.rb

output

rabbitmq {
    exchange => ...
    exchange_type => ...
    host => ...
}
