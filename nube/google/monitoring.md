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

Por encima tienen una app que hace la configuración de estas dos: https://github.com/GoogleCloudPlatform/ops-agent

Si queremos meter config custom seguir: https://cloud.google.com/monitoring/agent/ops-agent/configuration#metrics-config

Parece que el ExecStartPre=/opt/google-cloud-ops-agent/libexec/google_cloud_ops_agent_engine es quien genera la config final para otel collector.

## Prometheus
Parece que si queremos meter un scrapper extra de prometheus hay que poner unos flags especiales

Para la v2.23.0
UNSUPPORTED_BETA_PROMETHEUS_RECEIVER=enabled

Para version master
EXPERIMENTAL_FEATURES=prometheus_receiver

Ejemplos config (podemos poner cualquier config válida de prom)
https://github.com/GoogleCloudPlatform/ops-agent/blob/2.23.0/confgenerator/testdata/valid/linux/metrics-receiver_prometheus_relabel/input.yaml


## fluent-bit
https://cloud.google.com/logging/docs/agent/logging/configuration
