https://pulse.mozilla.org/api/


http://hg.rabbitmq.com/rabbitmq-management/raw-file/rabbitmq_v2_2_0/priv/www-api/help.html

Mirar tools.md para hablar con la api


# Exchanges
Listar:
curl -u ${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD} localhost:15672/api/exchanges

Crear:
curl -u ${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD} localhost:15672/api/exchanges/fh/tracker -H "content-type:application/json" -XPUT -d '{"type":"topic","durable":true}'
