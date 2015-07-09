Crear un topic (puede configurarse para que los topics se autocreen cuando se publica a un topic que no existe):
bin/kafka-topics.sh --zookeeper localhost:2181 --create --replication-factor 1 --partitions 1 --topic test

Listar topics:
bin/kafka-topics.sh --zookeeper localhost:2181 --list

/opt/zookeeper/bin/zkCli.sh
ls /config/topics


Más info:
bin/kafka-topics.sh --zookeeper localhost:2181 --list
bin/kafka-topics.sh --zookeeper localhost:2181 --list --topic nombre

"leader" is the node responsible for all reads and writes for the given partition. Each node will be the leader for a randomly selected portion of the partitions.
"replicas" is the list of nodes that replicate the log for this partition regardless of whether they are the leader or even if they are currently alive.
"isr" is the set of "in-sync" replicas. This is the subset of the replicas list that is currently alive and caught-up to the leader.



Publicar un mensaje:
mirar tools.md
