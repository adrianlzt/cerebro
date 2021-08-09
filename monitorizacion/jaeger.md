https://www.jaegertracing.io/
https://medium.com/opentracing/take-opentracing-for-a-hotrod-ride-f6e3141f7941

# Componentes
## Agent
Un jaeger client (una app donde hemos metido el SDK de jaeger) normalmente enviará al jaeger client que tenga en local.
Ese jaeger client será el que envie las métricas al collector y aplique las políticas que le obtenga del collector.

## Colletor
Recoge trazas de varios agentes y las envía a la DB (o a un kafka).
Las DBs posibles son ElasticSearch o Cassandra.
Pensando en añadir uno nuevo específico para OpenSearch: https://github.com/jaegertracing/jaeger/issues/3044

## Query / UI
Lee de la DB y muestra al usuario

## Ingester
En el caso de usar un kafka intermedio, este componente lee de kafka y envía a la DB.


# Opensearch
Si queremos usar opensearch tenemos que especificar a mano la versión de ES, si no, detecta version=1 y aplica las templates para ES6.x que no son compatibles
Failed to create span writer","error":"elastic: Error 400 (Bad Request): Setting index.mapper.dynamic was removed after version 6.0.0
Para especificar la versión:
 --env ES_VERSION=7


# Docker
https://hub.docker.com/r/jaegertracing/all-in-one

https://www.jaegertracing.io/docs/1.22/getting-started/

docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14268:14268 \
  -p 14250:14250 \
  -p 9411:9411 \
  jaegertracing/all-in-one


Significado de los puertos
https://github.com/jaegertracing/jaeger/blob/c5642b708be9e2577cc1c494889ae97946ccc78a/ports/ports.go#L23

5778 es donde los clientes preguntan para ver que sampling deben usar


# Web
http://localhost:16686/search


# Sampling
El SDK de jaeger permite definir un endpoint para modificar en caliente el sampling
https://github.com/jaegertracing/jaeger-client-go
JAEGER_SAMPLING_ENDPOINT
Parece que este SDK obtiene, por defecto, cada minuto las nuevas configs:
https://github.com/jaegertracing/jaeger-client-go/blob/7a33f7c403fe2ba1e2d25db2b0a318d038a861d4/sampler_remote.go#L151

Usan un fichero JSON donde definen que estrategia de sampling se aplica en cada service: https://www.jaegertracing.io/docs/1.23/sampling/#collector-sampling-configuration

En el container all-in-one la política es always: https://github.com/jaegertracing/jaeger/blob/master/cmd/all-in-one/sampling_strategies.json

El server de jaeger expone la información de sampling, para que accedan los clientes en:
localhost:5778/sampling?service=foo

Esta es la parte de su agente que lee de ese endpoint: https://github.com/jaegertracing/jaeger/blob/c5642b708be9e2577cc1c494889ae97946ccc78a/crossdock/services/agent.go#L56

Por lo que veo en https://github.com/jaegertracing/jaeger-client-go/blob/7a33f7c403fe2ba1e2d25db2b0a318d038a861d4/sampler_remote.go#L178 parece que cada service es el nombre del tracer: https://github.com/jaegertracing/jaeger-client-go/blob/7a33f7c403fe2ba1e2d25db2b0a318d038a861d4/span.go#L436
