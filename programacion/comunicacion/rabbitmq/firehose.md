http://www.rabbitmq.com/firehose.html

Activar
rabbitmqctl trace_on [-p "vhost"]

Con este python se ve lo del vhost "/". (y me da timeout si intento leer de otro virtual_host)
https://gist.github.com/khomenko/2562165

Para ponerle un vhost:
connection = pika.BlockingConnection(pika.ConnectionParameters(
    host='localhost',virtual_host='/'))



Otro lector de firehose, esta vez en ruby (FUCIONA! en este directorio: rabbitmq-trace-logger.rb):
https://gist.github.com/makuk66/1122629
Hace falta tener las rubygems: apt-get install rubygems
Y la gema: gem install amqp
Hay que editar el .rb para poner el la linea
AMQP.start("amqp://user:password@localhost/virtual_host") do |connection, open_ok|
Los parámetros de conexión


El comando:
amqp-publish --vhost="graphite" --username="graphite" --password="graphite" -e 'amq.fanout' -b "segundo" -r "mitest"
Genera:
metadata.routing_key : publish.amq.fanout
metadata.headers     : {"routing_keys"=>["mitest"], "node"=>"rabbit@rocksteady", "exchange_name"=>"amq.fanout", "properties"=>{"delivery_mode"=>2}}
Message: segundo.


