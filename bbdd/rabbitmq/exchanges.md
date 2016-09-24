rabbitmqctl list_exchanges

Mostrar todas las propiedades:
rabbitmqctl list_exchanges name type durable auto_delete internal arguments policy

rabbitmqadmin list exchanges

Crear exchange:
rabbitmqadmin declare exchange name=adri type=fanout auto_delete=true durable=false

rabbitmqadmin declare exchange name=scheduler_fanout type=fanout auto_delete=true durable=false internal=false arguments='{"policy":"ha-all"}'

Borrar exchange:
rabbitmqadmin delete exchange name=NOMBRE

