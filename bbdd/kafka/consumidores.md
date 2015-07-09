/opt/zookeeper/bin/zkCli.sh

Para ver los grupos de consumidores:
ls /consumers

Para ver los clientes del grupo de consumidores logstash
ls /consumers/logstash/owners

Posicion de los consumidores sobre el log total:
kafka-run-class.sh kafka.tools.ConsumerOffsetChecker --zookeeper localhost:2181 --group logstash
