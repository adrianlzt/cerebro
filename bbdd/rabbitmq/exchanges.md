rabbitmqctl list_exchanges

curl -u ${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD} localhost:15672/api/exchanges

Mostrar todas las propiedades:
rabbitmqctl list_exchanges name type durable auto_delete internal arguments policy

rabbitmqadmin list exchanges
rabbitmqctl list_exchanges -p some_vhost

Crear exchange (usango rabbitmqadmin https://www.rabbitmq.com/management-cli.html):
rabbitmqadmin declare exchange name=adri type=fanout auto_delete=true durable=false

rabbitmqadmin declare exchange name=scheduler_fanout type=fanout auto_delete=true durable=false internal=false arguments='{"policy":"ha-all"}'

curl -u ${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD} localhost:15672/api/exchanges/fh/tracker -H "content-type:application/json" -XPUT -d '{"type":"topic","durable":true}'

Borrar exchange:
rabbitmqadmin delete exchange name=NOMBRE

