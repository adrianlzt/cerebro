https://opentelemetry.io/docs/go/

mirar sdk.md para entender como funciona por debajo.

Mirar si ya existe una extensión que tracee lo que queremos:
https://github.com/open-telemetry/opentelemetry-go-contrib

Listado de librerías que ya tienen instrumentación: https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation

Exporters disponibles:
https://github.com/open-telemetry/opentelemetry-go/tree/main/exporters
https://pkg.go.dev/go.opentelemetry.io/otel@v0.9.0/exporters


Ejemplo creando spans y métricas manualmente:
ejemplos/opentelemetry.go
ejemplos/opentelemetry_jaeger.go <-- pruebas mias, con output directo a jaeger


# Instrumentalizar net/http
https://github.com/open-telemetry/opentelemetry-go-contrib/blob/main/instrumentation/net/http/otelhttp/example/client/client.go
https://pkg.go.dev/go.opentelemetry.io/otel@v0.1.1/plugin/othttp


# Inicialización
https://github.com/open-telemetry/opentelemetry-go/blob/main/example/otel-collector/main.go#L46

Ejemplo de exporter directo a Jager. El endpoint será algo tipo: http://localhost:14268/api/traces
exporter, err := jaeger.NewRawExporter(jaeger.WithCollectorEndpoint(jaeger.WithEndpoint(endpoint)))
if err != nil {
  log.Fatal(err)
}

Ejemplo de exporter para el otel-collector, bloqueante y sin TLS
https://github.com/open-telemetry/opentelemetry-collector/blob/03c7bf98f7edf6e578aac303e4d8b767f117541e/examples/demo/app/main.go#L53

Ejemplo de exporter a stdout:
https://github.com/open-telemetry/opentelemetry-go-contrib/blob/main/instrumentation/github.com/gorilla/mux/otelmux/example/server.go#L56


Una vez tenemos el exporter, generamos el trace provider:
bsp := sdktrace.NewBatchSpanProcessor(exporter)

// sdktrace.ParentBased tracea si el padre está siendo traceado.
tracerProvider := sdktrace.NewTracerProvider(
  sdktrace.WithSampler(sdktrace.ParentBased(sdktrace.TraceIDRatioBased(1))), // tunear el "factor" para decidir que porcentaje de trazas capturar
  sdktrace.WithSpanProcessor(bsp),
  sdktrace.WithResource(resource.NewWithAttributes(semconv.ServiceNameKey.String("Skydive"))),
)

Si en vez de usar WithSpanProcessor() usamos WithSyncer(exporter) lo que estaremos diciéndole es que en cada span haga el envío al exporter.
Esto provoca un bloqueo de la app hasta que el span es enviando, por lo tanto NO usar WithSyncer en producción!
Por lo tanto mejor usar el BatchSpanProcessor, que las agrupa y envía al final.

Para evitar tener que ir pasando "tracerProvider" para crear nuevos Tracers, podemos hacer uso de la lib "go.opentelemetry.io/otel", que nos permite almacenar el "tracerProvider" de forma global para poder obtenerlo desde cualquier sitio.
Ejemplo, tras crear el "tracerProvider" lo almacenamos globalmente con:
otel.SetTracerProvider(tracerProvider)

En cualquier otro parte del programa, si queremos obtener un Tracer a partir de ese TracerProvider haremos:
tracer := otel.Tracer("nombre")
Como nombre generalmente usaremos la librería donde estamos creando ese tracer (por ejemplo, el package en go).



# Metrics

import "go.opentelemetry.io/otel/metric/global"
...
meter := global.Meter("test-meter")

valuerecorder := metric.Must(meter).
  NewFloat64Counter(
    "an_important_metric",
    metric.WithDescription("Measures the cumulative epicness of the app"),
  ).Bind(commonLabels...)
defer valuerecorder.Unbind()

valuerecorder.Add(ctx, 1.0)


Ejemplo de como se ve en prometheus
testapp_an_important_metric{labelA="chocolate",labelB="raspberry",labelC="vanilla"} 10



# Tracer
Si en la inicialización hemos guardado el Tracer Provider en la config global aportada por la lib "otel", podemos generar otro tracer con:
tracer := otel.Tracer("test-tracer")

Para poder acceder al tracer, definimos en los distintos packages una variable global con el tracer:
var tracer = otel.Tracer("mux-server")

https://github.com/open-telemetry/opentelemetry-go/blob/main/example/jaeger/main.go#L94
Aqui lo hacen volviendo a obtener un Tracer desde el TracerProvider global.

También podemos recuperar el span a partir del context y del span el Tracer:
rootSpan := trace.SpanFromContext(ctx)
_, span := rootSpan.Tracer().Start(ctx, "worker", trace.WithAttributes(attribute.Key("workerId").String(name)))



# Spans
Para generar un span a partir de un tracer:
ctx, span := tracer.Start(
  context.Background(),
  "CollectorExporter-Example",
  trace.WithAttributes(commonLabels...))
defer span.End()

_, iSpan := tracer.Start(ctx, fmt.Sprintf("Sample-%d", i))
iSpan.End()

Meter una traza con attributes/tags
span.Tracer().Start(ctx, "metric", trace.WithAttributes(attribute.Key("metric").String(metric.Name)))


Si queremos recuperar el span a partir del context:
span := trace.SpanFromContext(ctx)


Añadir eventos al span:
span.AddEvent("sent to Server", trace.WithAttributes(attribute.Key("response code").String("xxx")))



# Atributos
"go.opentelemetry.io/otel/attribute"

Ejemplo básico:
span.SetAttributes(attribute.Key("Query").String(resource.GremlinQuery))


OpenTelemetry semantic conventions are agreed standardized naming patterns for OpenTelemetry things. This package aims to be the centralized place to interact with these conventions.
https://pkg.go.dev/go.opentelemetry.io/otel@v0.20.0/semconv

Ejemplo de uso al crear un tracer
https://github.com/open-telemetry/opentelemetry-go-contrib/blob/main/instrumentation/github.com/gorilla/mux/otelmux/mux.go#L136

Ejemplo de opciones usadas para un span de una petición HTTP
https://github.com/open-telemetry/opentelemetry-go-contrib/blob/main/instrumentation/github.com/gorilla/mux/otelmux/mux.go#L148




# Finalizar
Como se debe gestionar la finalización del programa?
Parece que se debe llamar a TracerProvider.Shutdown(ctx)
El contexto parece que se usa para poder poner un timeout al tiempo de finalización:
https://github.com/open-telemetry/opentelemetry-go/blob/main/example/jaeger/main.go#L77
https://github.com/open-telemetry/opentelemetry-go/blob/sdk/v0.20.0/sdk/trace/provider.go#L210
