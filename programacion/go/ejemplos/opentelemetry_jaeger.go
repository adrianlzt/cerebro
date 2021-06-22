package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"sync"
	"time"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/codes"
	"go.opentelemetry.io/otel/exporters/trace/jaeger"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	"go.opentelemetry.io/otel/semconv"
	"go.opentelemetry.io/otel/trace"
)

func main() {
	// Iniciamos el tracer
	stopTracerProvider := initTracer(map[string]string{"endpoint": "http://localhost:14268/api/traces"})

	// Simulamos trabajo
	process()

	// Paramos el tracer correctamente, para asegurarnos que se envien todos los datos al backend
	stopTracerProvider()
}

func process() {
	// Obtenemos el tracer, que se usará para crear los spans
	tracer := otel.Tracer("main")

	// Creamos un span padre
	ctx, span := tracer.Start(context.Background(), "process")
	defer span.End()

	wg := sync.WaitGroup{}
	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func(i int) {
			worker(ctx, fmt.Sprintf("worker-%d", i))
			wg.Done()
		}(i)
	}
	wg.Wait()
}

func worker(ctx context.Context, name string) {
	// Recuperamos el span padre y a partir de el creamos otro span
	rootSpan := trace.SpanFromContext(ctx)
	_, span := rootSpan.Tracer().Start(ctx, "worker", trace.WithAttributes(attribute.Key("workerId").String(name)))
	defer span.End()

	parseConfig(ctx)

	time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)
	span.AddEvent("sent to Server", trace.WithAttributes(attribute.Key("response code").String("xxx")))
	time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)
	span.AddEvent("sent to client")
	time.Sleep(time.Duration(200+rand.Intn(1000)) * time.Millisecond)

	switch rand.Intn(3) {
	case 0:
		span.SetStatus(codes.Error, "No pudo procesar")
	case 1:
		span.SetStatus(codes.Ok, "Todo bien")
	}
}

func parseConfig(ctx context.Context) {
	// Obtenemos otro tracer a partir del global
	// Posiblemente queramos definir a nivel de package un tracer global, mirar doc
	tracer := otel.GetTracerProvider().Tracer("main")
	_, span := tracer.Start(ctx, "parseConfig")
	defer span.End()
	time.Sleep(time.Duration(200+rand.Intn(1000)) * time.Millisecond)
}

// initTracer setup the OpenTelemetry instrumentation
func initTracer(config map[string]string) func() {
	// Jaeger exporter
	endpoint := config["endpoint"]
	exporter, err := jaeger.NewRawExporter(jaeger.WithCollectorEndpoint(jaeger.WithEndpoint(endpoint)))
	if err != nil {
		log.Fatal(err)
	}

	// ParentBased es para que si el padre no se tracea, los hijos tampoco
	tracerProvider := sdktrace.NewTracerProvider(
		sdktrace.WithSampler(sdktrace.ParentBased(sdktrace.TraceIDRatioBased(1))), // Tunear el "factor", ahora está puesto a 1 para tracear siempre
		sdktrace.WithBatcher(exporter),
		sdktrace.WithResource(resource.NewWithAttributes(
			semconv.ServiceNameKey.String("Pruebas4"),
			semconv.HostImageVersionKey.String("ImageVersion 1.2.3"),
		)),
	)
	if err != nil {
		log.Fatal(err)
	}
	// Almacenamos el tracerProvider globalmente
	otel.SetTracerProvider(tracerProvider)
	otel.SetTextMapPropagator(propagation.NewCompositeTextMapPropagator(propagation.TraceContext{}, propagation.Baggage{}))

	return func() {
		// Shutdown will flush any remaining spans and shut down the exporter.
		err = tracerProvider.Shutdown(context.Background())
		if err != nil {
			log.Fatalf("%s: %v", "failed to shutdown TracerProvider", err)
		}
	}
}
