https://github.com/logstash-plugins/logstash-output-kafka

# Output
https://www.elastic.co/guide/en/logstash/current/plugins-outputs-kafka.html

broker_list:
host1:port1,host2:port2

client_id:
poner al hostname de la maquina

sync / async: por defecto está sync. async es mejor para performance, envia muchos de golpe, pero puede perder algunos si falla.

topic_id: debe ser el mismo que el configurado en los consumidores

output {
  kafka {
    broker_list => "server_kafka1.9092,server_kafka2:9092,server_kafka3:9092"
    client_id => "el_hostname"
    topic_id => "logstash"
  }
}



# Input
https://www.elastic.co/guide/en/logstash/current/plugins-inputs-kafka.html

consumer_threads
Value type is number
Default value is 1
Number of threads to read from the partitions. Ideally you should have as many threads as the number of partitions for a perfect balance. More threads than partitions means that some threads will be idle. Less threads means a single thread could be consuming from more than one partition

group_id
todos los consumers deben pertenecer al mismo consumer group, para que cada mensaje sea procesado solo por un consumidor.

topic_id
Value type is string
Default value is nil
The topic to consume messages from

zk_connect
Value type is string
Default value is "localhost:2181

input {
  kafka {
    zk_connect => "server_zookeeper1.2181,server_zookeeper2:2181,server_zookeeper3:2181"
    topic_id => "logstash"
  }
}
