Habilitar interfaz administrativa:

https://www.rabbitmq.com/management.html
rabbitmq-plugins enable rabbitmq_management


User para monitorizar:
rabbitmqctl add_user tools PASSWORD
rabbitmqctl set_user_tags tools monitoring
rabbitmqctl set_permissions tools ".*" ".*" ".*"



https://blog.serverdensity.com/clearing-purging-rabbitmq-queues/
vigilar el tamaño de las colas

Buscar en /var/log/rabbitmq/startup_log la palabra crashed

Un check que use amqp para publicar y recibir un dato, para asegurarnos que las colas están funcionando.
Un check que vigile el fichero /var/log/rabbitmq/startup_log en busca de la palabra "crashed". Estaría también interesante vigilar que su tamaño no crezca desmesuradamente.
Vigilar tambien cualquier traza en /var/log/rabbitmq/startup_err
 
Vigilar los ficheros:
rabbit@prod-epg-ostkc-01.log
rabbit@prod-epg-ostkc-01-sasl.log
en busca de la palabra "ERROR".
Estos ficheros rotan asi (weekly y con delay compress):
rabbit@nodo-01-sasl.log-20160502
rabbit@nodo-01-sasl.log-20160424.gz
 
Check que vigile el tamaño de los ficheros.
