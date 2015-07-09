https://github.com/Shopify/sarama/tree/master/tools

Herramientas escritas en Go para poder hacer pruebas, publicar, subcribirse, etc


GOPATH=/tmp go get github.com/Shopify/sarama/tools/kafka-console-producer
/tmp/bin/kafka-console-producer

./kafka-console-producer -brokers="172.16.1.56:9092,172.16.1.57:9092,172.16.1.58:9092" -topic="topico-replicado" -value="prueba GO"



GOPATH=/tmp go get github.com/Shopify/sarama/tools/kafka-console-consumer
/tmp/bin/kafka-console-consumer

/kafka-console-consumer -brokers="172.16.1.56:9092,172.16.1.57:9092,172.16.1.58:9092" -topic="topico-replicado" -offset="oldest"

