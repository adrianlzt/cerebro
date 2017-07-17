http://www.hawkular.org/

Hawkular Services
provides services to store metrics, alert on metrics, keep a graph view of an inventory

Hawkular Metrics
Almacen de métricas sobre Cassandra

Hawkular APM
Para monitorizar aplicaciones



# API

## Metrics
http://www.hawkular.org/docs/rest/rest-metrics.html

Estos ejemplos suponen que el endpoint de hawkular es: https://hawkular-metrics.inet/hawkular/metrics

Obtener los tenants disponibles (WARN! parece que nos expone todos los disponibles, aunque no tengamos acceso, corregido en nuevas versiones)
curl -H "Hawkular-Tenant: xxx" -H "Authorization: Bearer xxx" https://hawkular-metrics.inet/hawkular/metrics/tenants/

Lista de tags:
curl -H "Hawkular-Tenant: xxx" -H "Authorization: Bearer xxx" https://hawkular-metrics.inet/hawkular/metrics/metrics/tags

Listas de métricas:
curl -H "Hawkular-Tenant: xxx" -H "Authorization: Bearer xxx" https://hawkular-metrics.inet/hawkular/metrics/metrics



Pedir una métrica
curl https://hawkular-metrics.inet/hawkular/metrics/gauges/raw/query' -H 'Hawkular-Tenant: logging' -H 'Authorization: Bearer XXX' -H 'Content-Type: application/json' --data-binary '{"start":1499934459274,"end":1500020859274,"order":"ASC","ids":["fluentd-elasticsearch/eb13e04c-5d83-11e7-b17a-005056887d35/memory/usage"]}'

Respuesta tipo:
[{"id":"fluentd-elasticsearch/eb13e04c-5d83-11e7-b17a-005056887d35/memory/usage","data":[{"timestamp":1499934480000,"value":1.51830528E8},{"timestamp":1499934510000,"value":1.52236032E8}]]
