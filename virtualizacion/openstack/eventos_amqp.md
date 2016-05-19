OpenStack se comunica mediante mensajes en RabbitMQ
Estos mensajes se publican en distintos exchanges con distintos topics (o routing keys).
Otros estarán escuchando en ciertas colas para recibir esos mensajes y actuar en consecuencia.

Un ejemplo es Designate (sink), que escucha mensajes de Nova y Neutron para saber cuando crear un dominio para un nodo o ip flotante.



Ejemplo de mensajes generados por Nova al crear una instancia:
eventos_amqp_create_vm.json

Tipos de eventos que se producen:
compute.instance.update
scheduler.select_destinations.start
scheduler.select_destinations.end
compute.instance.update
compute.instance.create.start
compute.instance.update
compute.instance.create.end


Eventos al crear una ip flotante:
eventos_amqp_create_floating_ip.json
floatingip.create.start
floatingip.create.end

Eventos al asociar una floating ip:
eventos_amqp_asociar_floating_ip_a_vm.json
floatingip.update.start
floatingip.update.end

Eventos al crear un puerto:
eventos_amqp_create_port.json
port.create.start
port.create.end

Eventos al asociar una ip flotante a un puerto:
eventos_amqp_asociar_floating_ip_a_port.json
floatingip.update.start
floatingip.update.end
