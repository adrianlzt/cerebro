# Tracing API

TracerProvider -> Tracer -> Span -> [events,attributes,status]

La idea es que generamos un span a partir de la petición que nos llegue.
Por ejemplo, en un server web, recibimos una petición que puede contener información de un span, lo regeneramos y seguimos generando sub-spans a partir de él.
De esta manera podemos tener una vista multi aplicación.


## Tracer provider
Is the entry point of the API. It provides access to Tracers.
Este deberá configurarse (sacado de https://pkg.go.dev/go.opentelemetry.io/otel/sdk/trace#TracerProvider) con:
 - sampler (decide que spans se envían y cuales se ignoran)
 - random number generator (para generar los TraceID y SpanID)
 - span limits (se definen los límites de número de atributos, número de spans, de links, etc)
 - resource (atributos que representar a la entidad que generó este span)
 - span processors (quienes envian los datos)

En go cada una de esas configuraciones que pasamos debe cumplir la interfaz TracerProviderOption, que define un método "apply(*tracerProviderConfig).
Lo que hace es iterar por las opciones, donde cada una va poniendo en un struct lo que quiere.


Este tracer provider debe proveer un método "Tracer", donde al menos se pueda pasar el nombre de la librería que estamos instrumentando, por ejemplo: io.opentelemetry.contrib.mongodb
Ejemplo de interface a cumplir en Go: https://pkg.go.dev/go.opentelemetry.io/otel/trace#TracerProvider


### Sampler
Sampler decides whether a trace should be sampled and exported.
Será usado por los "Tracers" generados a partir del "Tracer provider".
Ejemplo de la interfaz en Go: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/trace#Sampler

### Resource
Podemos añadir info como la versión, un nombre, entorno, etc

### Span processors
Se llaman al comienzo y al final de cada span.
Si tenemos varios, se llaman en el orden que se hayan registrado.

En Go deben cumplir la interfaz SpanProcessor
  OnStart
  OnEnd
  Shutdown
  ForceFlush

Parece que se implementan dos tipos de span processors:
  syncer: envía síncronamente los datos (bloquea, NO usar en producción)
  batcher: arranca una gorutina. Va encolando los datos y los procesa cada X segundos


## Tracer
Is the class responsible for creating Spans.
Usando el SDK de Go y enviando directamente a Jager, el nombre del tracer solo se usa para ponerlo como un tag del span.
Entiendo que lo usaremos para ir definiendo desde que lib estamos generando los spans.

## Context
https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#context-interaction
Se debe poder añadir o extraer un Span del Context.

### Baggage
https://pkg.go.dev/go.opentelemetry.io/otel/propagation#TextMapCarrier
https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/overview.md#baggage-signal

Parece que es una forma de añadir información extra al context.
Pero por lo que veo está muy relacionada a sacar meter información de los headers HTTP
https://github.com/open-telemetry/opentelemetry-go-contrib/blob/7a135d308b4dfb8696cde050544c0ab30c261928/instrumentation/github.com/gorilla/mux/otelmux/mux.go#L119


## Span
Is the API to trace an operation.
Representa una operación dentro de una traza.
Pueden anidarse para formar un arbol de trazas.
Siempre se tendrá un "root span", que contiene la operación entera y dentro, opcionalmente, más sub-spans para las operaciones internas.

Representación gráfica de un spans con sus sub-spans. En forma de grafo y en tiempo:
https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/overview.md#links-between-spans

Los spans contienen:
 - nombre (generalmente será el nombre de la función. No debe generar mucha cardinalidad, que el nombre varie mucho)
 - SpanContext (identificaión unívoca del span)
 - parent (opcional)
 - SpanKind
 - start/end timestamp
 - atributos
 - links a otros spans
 - events (cada uno con su timestamp)
 - status (no me queda muy claro, para marcar errores y también poder ignorar errores de sub-spans?)

Al crear un Span, si queremos que sea un root span deberemos pasarle un context vacío.
Si queremos que sea child de otro span, deberemos pasar el context que se generó al crear el span padre.

### Status
Podemos definir el status de un span.
Por defecto está a Unset.
Podemos cambiar el estado añadiendo también un mensaje.
span.SetStatus(codes.Error, "No pudo procesar")

En el visualizador de jaeger, veremos un icono en el span indicando el error.


### SpanContext
https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#spancontext
Siguiendo la especificación de la W3C, el SpanContext es la parte del Span que se va a propagar en el context.
Esta llevará los valores TraceId, SpanId, TraceFlags, TraceState.


### Links entre spans
https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/overview.md#links-between-spans
Diferentes casos de uso, siendo el más común cuando un span es inicializado por varios spans.



# Collector
Mirar la sección de arriba


## Jaeger
Podemos enviar métricas directamente a jaeger: http://localhost:14268/api/traces

Ejemplo de código para go: https://github.com/open-telemetry/opentelemetry-go/blob/main/example/jaeger/main.go#L27


