Levanta puertos para recibir métricas/trazas en distintos protocolos.
Envia esas trazas/métricas a distintos endpoints.

Las trazas las tendermos que enviar a un backend que las soporte, como jaeger.
Las métricas a prometheus por ejemplo.
Las pipelines definirán donde enviaremos cada cosa según que tipo sea y de donde venga.


# Docker / k8s
https://hub.docker.com/r/otel/opentelemetry-collector
container from scratch
Dockerfile y config por defecto: https://github.com/open-telemetry/opentelemetry-collector/tree/main/cmd/otelcol

Ejemplo de config
https://github.com/open-telemetry/opentelemetry-collector/blob/18ddc140dd6ec60489ac61bbc084c26750681198/examples/local/otel-config.yaml
https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector/18ddc140dd6ec60489ac61bbc084c26750681198/examples/local/otel-config.yaml

Config básica que recibe protocolo OTLP y imprime por pantalla
receivers:
  otlp:
    protocols:
      grpc:
      http:

processors:
  batch:

exporters:
  logging:
    logLevel: debug

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [logging]


Ejemplo de docker-run
docker run --rm -it --net host -v "$PWD/otel-config.yaml:/etc/otel/config.yaml" otel/opentelemetry-collector:latest

yaml para despliegue en k8s
https://github.com/open-telemetry/opentelemetry-go/blob/main/example/otel-collector/k8s/otel-collector.yaml


# Receivers
Si usamos el protocolo otel, usaremos por defecto el puerto 4317/tcp.
Las diferentes opciones que hay para recibir datos se llaman receivers.


# Exporters
https://opentelemetry.io/docs/collector/configuration/#exporters
Es a donde enviaremos los datos.
O en caso de prometheus, como los expondremos.

En caso de no poder conectar a un exporter, el colelctor arrancará correctamente, pero mostrará errores de conexión.

## Jaeger
La comunicación se hará por el puerto 14250, usando HTTP/model.proto
Ejemplo:
  jaeger:
    endpoint: "jaeger-all-in-one:14250"
    insecure: true

## OpenSearch data prepper
Config para probar:
  otlp/2:
    endpoint: "localhost:21890"
    insecure: true



# Monitoring del collector
Exporter de prometheus de su propio estado:
localhost:8888/metrics

Health endpoint
curl localhost:13133
{"status":"Server available","upSince":"2021-05-25T14:09:43.70743436Z","uptime":"2m0.174957858s"}

pprof https://github.com/open-telemetry/opentelemetry-collector/tree/18ddc140dd6ec60489ac61bbc084c26750681198/extension/pprofextension
0.0.0.0:1777

zpages (mirar al final de este doc, sección zPages)
0.0.0.0:55679
https://github.com/open-telemetry/opentelemetry-collector/blob/18ddc140dd6ec60489ac61bbc084c26750681198/extension/zpagesextension/README.md#exposed-zpages-routes
