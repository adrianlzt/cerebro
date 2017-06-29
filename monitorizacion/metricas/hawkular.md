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

Obtener los tenants disponibles (WARN! parece que nos expone todos los disponibles, aunque no tengamos acceso)
curl -H "Hawkular-Tenant: xxx" -H "Authorization: Bearer xxx" https://hawkular-metrics.inet/hawkular/metrics/tenants/
