Administración: rabbitmqctl
http://www.rabbitmq.com/man/rabbitmqctl.1.man.html

rabbitmqctl status
Saldida JSON de que está corriendo, versiones, memoria, etc


Creo user: rabbitmqctl add_user graphite amqp-password
Creo vhost: rabbitmqctl add_vhost graphite  
Doy permisos la user en el vhost: rabbitmqctl set_permissions -p graphite graphite ".*" ".*" ".*"
Cambiar password: rabbitmqctl change_password guest password


rabbitmqctl list_vhosts
rabbitmqctl list_queues -p graphite
rabbitmqctl list_exchanges -p graphite
rabbitmqctl list_connections -p graphite


## Tools - apt-get install amqp-tools ##

Creo una cola
amqp-declare-queue -q pepito --vhost=graphite --username=graphite --password=graphite

Le pongo un dato
amqp-publish --vhost="graphite" --username="graphite" --password="graphite" -r "pepito" -b "collectd.metrica 12312 2341312312"

Muestro datos en la cola
rabbitmqctl list_queues -p graphite

Consumo los datos que lleguen a esa cola
amqp-consume --vhost="graphite" --username="graphite" --password="graphite" -q pepito cat

Borrar la cola
amqp-delete-queue -q pepito --vhost=graphite --username=graphite --password=graphite
