flink

https://redpanda.com/
Redpanda is a Kafka®-compatible streaming data platform that is up to 10x faster and 6x more hardware-efficient. It is also JVM-free, ZooKeeper®-free, Jepsen-tested and source available.

# CLI
curl -LO https://github.com/redpanda-data/redpanda/releases/latest/download/rpk-linux-amd64.zip

rpk cluster info --brokers 127.0.0.1:19092

Enviar mensaje (nos dejará la shell sin retornar para que pongamos un mensaje y demos a enter, podemos hacerlo varias, veces, control+c para salir):
rpk --brokers 127.0.0.1:19092 topic produce pruebas
