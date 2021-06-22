https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#sampling

Se puede hacer en la SDK o en el collector.


El SDK de jaeger permite definir un endpoint para modificar en caliente el sampling
Mirar los detalles en "# Sampling" en monitorizacion/jaeger.md

Parece que no está implementado en el collector (y entiendo que tampoco en las SDKs propias de otel)
https://github.com/open-telemetry/opentelemetry-collector-contrib/issues/1562

No sería muy dificil implementar un sampler que modificase el ratio según una signal o llamadas periódicas a un endpoint.
https://pkg.go.dev/go.opentelemetry.io/otel/sdk/trace#Sampler


# No tracear si el padre está marcado como not sampling
Si usamos el sampler "ParentBased", con las opciones por defecto, si el padre está marcado como "no sampled", los children tampoco se almacenarán.

tracerProvider := sdktrace.NewTracerProvider(
    sdktrace.WithSampler(sdktrace.ParentBased(sdktrace.TraceIDRatioBased(1))), // Tunear el "factor", ahora está puesto a 1 para tracear siempre
    ...
)

Ejemplo de modificando un contexto para que sea "no sampled".
El hijo que use "ctx" no será sampleado:
ctx, span := tracer.Start(ctx, "nombre")
sc := span.SpanContext().WithTraceFlags(span.SpanContext().TraceFlags().WithSampled(false))
ctx = trace.ContextWithSpanContext(ctx, sc)



Hay una issue abierta en la especificación para ver como gestionar esto:
https://github.com/open-telemetry/opentelemetry-specification/issues/530
