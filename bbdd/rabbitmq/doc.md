http://www.rabbitmq.com/tutorials/tutorial-one-python.html
https://www.rabbitmq.com/tutorials/amqp-concepts.html

# Exchanges
Son los receptores de los mensajes.
Estos mensajes se enrutarán a cero o más queues para ser leídos

Este enrutamiento de mensajes dependerá del tipo de exchange y las reglas (bindings).

Hay 4 tipos de exchanges:
  direct (default, sin nombre)
  fanout
  topic
  headers

Los exchanges también tendrán:
  nombre
  durabilidad (si sobrevive a un restart del broker)
  auto-delete (exchange se borra cuando todas las colas han terminado de usarlo)
  arguments (broker-dependent)


## Direct
Enrutan mensajes según el "routing key".
Para cada mensaje que llegue al exchange, este mirará el "routing key" y lo pondrá en la queue del mismo nombre (o con la clave que se haya registrado esta cola).

## Fanout
Envia los mensajes a todas las queues registradas.
La routing key es ignorada.

## Topic
Las queues hacen binding con regexp al exchange.
Cuando llegue un mensaje, se parseara el routing key con los patters de las colas para decidir a quien se envia el mensaje

## Headers
Se enruta según las Headers de los mensajes en vez de por el routing key.


# Queues
Propiedades:
  Name
  Durable (the queue will survive a broker restart)
  Exclusive (used by only one connection and the queue will be deleted when that connection closes)
  Auto-delete (queue is deleted when last consumer unsubscribes)
  Arguments (some brokers use it to implement additional features like message TTL)

Las colas pueden tener dos políticas de cuando borrar los mensajes:
  After broker sends a message to an application (using either basic.deliver or basic.get-ok AMQP methods). Called automatic acknowledgement model
  After the application sends back an acknowledgement (using basic.ack AMQP method). Called explicit acknowledgement model

# Consumers
Pueden estar configurados de dos maneras:
  pull, se conectan periódicamente a ver si hay nuevos mensajes
  push, los mensajes son empujados por el broker a los consumidores

# Virtual Hosts
To make it possible for a single broker to host multiple isolated "environments" (groups of users, exchanges, queues and so on), AMQP includes the concept of virtual hosts (vhosts).
