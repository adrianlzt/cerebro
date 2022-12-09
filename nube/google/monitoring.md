https://console.cloud.google.com/monitoring

# Notificaciones a google chat
Usar pub/sub + cloud function

Este es más moderno:
https://cloud.google.com/blog/products/operations/write-and-deploy-cloud-monitoring-alert-notifications-to-third-party-services

https://medium.com/cts-technologies/gcp-operations-suite-alerts-into-google-chat-1a3c39f84187


En PubSub llamará a nuestra función main con un un json tipo:
{'@type': 'type.googleapis.com/google.pubsub.v1.PubsubMessage', 'attributes': None, 'data': 'ewog...datos en base64'}

Dentro de ese campo 'data' habrá un JSON.
Ejemplo del formato:
https://gist.github.com/adrianlzt/8bc6bbf6f811feefe6a186c582191fdf


# Agentes
https://cloud.google.com/logging/docs/agent/ops-agent

Usan OpenTelemetry collector (otelopscol) para métricas y trazas.
Usan fluent-bit para logs.

## fluent-bit
https://cloud.google.com/logging/docs/agent/logging/configuration
