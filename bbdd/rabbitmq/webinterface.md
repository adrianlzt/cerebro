https://www.rabbitmq.com/management.html

rabbitmq-plugins enable rabbitmq_management
/etc/init.d/rabbitmq-server restart

http://server:15672
user: guest
pass: guest

Por defecto este usuario solo ve el vhost "/".
Tendremos que ir a "Admin", y pulsar sobre 'guest' para añadirle visibilidad sobre más vhosts


Podemos consultar los mensajes en la cola. La interfaz web los sacará y los volverá a meter.
Clicking "Get Message(s)" will consume messages from the queue. If requeue is set the message will be put back into the queue in place, but "redelivered" will be set on the message.
