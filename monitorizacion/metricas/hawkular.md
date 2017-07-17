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
https://github.com/openshift/origin-metrics/blob/master/docs/hawkular_metrics.adoc#calcuating-percentage-cpu-usage

Ejemplos jugando tambien con alerts y events: https://github.com/moolitayer/hawkular-curl-examples


Estos ejemplos suponen que el endpoint de hawkular es: https://hawkular-metrics.inet/hawkular/metrics

Obtener los tenants disponibles (WARN! parece que nos expone todos los disponibles, aunque no tengamos acceso, corregido en nuevas versiones)
curl -H "Hawkular-Tenant: xxx" -H "Authorization: Bearer xxx" https://hawkular-metrics.inet/hawkular/metrics/tenants/

Lista de tags:
curl -H "Hawkular-Tenant: xxx" -H "Authorization: Bearer xxx" https://hawkular-metrics.inet/hawkular/metrics/metrics/tags

Posibles valores de un tag (en este caso 'group_id'):
curl -H "Hawkular-Tenant: xxx" -H "Authorization: Bearer xxx" "https://hawkular-metrics.inet/hawkular/metrics/metrics/tags/group_id:*"


Listas de métricas:
curl -H "Hawkular-Tenant: xxx" -H "Authorization: Bearer xxx" https://hawkular-metrics.inet/hawkular/metrics/metrics
  si queremos solo obtener de un tipo, pondemos al final:
    ?type=gauge
    ?type=counter
    ?type=availability

Otra opción:
curl -H "Hawkular-Tenant: xxx" -H "Authorization: Bearer xxx" https://hawkular-metrics.inet/hawkular/metrics/gauges


Listas de métricas disponibles tras filtrar por un tag:
curl -H "Hawkular-Tenant: xxx" -H "Authorization: Bearer xxx" "https://hawkular-metrics.inet/hawkular/metrics/metrics?tags=group_id:fluentd-elasticsearch/memory/usage"


Pedir info de una métrica:
curl -H "Hawkular-Tenant: xxx" -H "Authorization: Bearer xxx" "https://hawkular-metrics.inet/hawkular/metrics/gauges/ID"
  si el ID tiene "/" u otros caracteres raros, convertir a urlencode



Pedir valores una métrica
curl https://hawkular-metrics.inet/hawkular/metrics/gauges/raw/query' -H 'Hawkular-Tenant: logging' -H 'Authorization: Bearer XXX' -H 'Content-Type: application/json' --data-binary '{"start":1499934459274,"end":1500020859274,"order":"ASC","ids":["fluentd-elasticsearch/eb13e04c-5d83-11e7-b17a-005056887d35/memory/usage"]}'

Respuesta tipo:
[{"id":"fluentd-elasticsearch/eb13e04c-5d83-11e7-b17a-005056887d35/memory/usage","data":[{"timestamp":1499934480000,"value":1.51830528E8},{"timestamp":1499934510000,"value":1.52236032E8}]]


Podemos pedir tambien filtrando por un tag:
{"start":1500208187560,"end":1500294587560,"order":"ASC","tags":"group_id:fluentd-elasticsearch/memory/usage"}
Nos devolverá un array de diccionarios, cada uno para una métrica distinta.
