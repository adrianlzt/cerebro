http://kafka.apache.org/documentation.html

Kafka maintains feeds of messages in categories called topics.
We'll call processes that publish messages to a Kafka topic producers.
We'll call processes that subscribe to topics and process the feed of published messages consumers..
Kafka is run as a cluster comprised of one or more servers each of which is called a broker.


Los producers envian mensajes a un topic.
Los mensajes se borran pasado un determinado tiempo desde su publicación, hayan sido consumidos o no (no se borran tras consumirlos).
Un consumidor debe controlar el 'offset' donde estaba leyendo los mensajes; podría luego leer un mensaje más antiguo y luego los nuevos.

El particionado de un topic en varios partitions sirve para varias cosas:
  - poder alojar un topic muy grande entre distintos servidores (brokers)
  - cada partition se aloja en uno o varios brokers, según el parámetro "replication factor"
  - cada partition tiene un broker leader y otros followers. El leader es quien maneja las escrituras y lecturas, el resto copian

Los producers envian los mensajes al topic-partition que ellos decidan. Generalmente se usará un round-robin para distribuir los mensajes entre las disintas partitions.


# Distribución de mensajes
Cada consumer se apunta a un "consumer group".
Los "consumer group" se apuntan a un topic.
Cada mensaje publicado en un topic es enviado a todosl los "consumer groups" subscritos, pero solo un consumer de cada grupo recibirá el mensaje.

Si todos los consumers están en el mismo consumer group, será como un sistema de colas (tareas que deben ser atendidas por un único worker).
Si cada consumer está en su propio consumer group, el mensaje será distribuido a todos los consumers, estilo publish-subscribe.
