<https://github.com/pyrra-dev/pyrra>

Making SLOs with Prometheus manageable, accessible, and easy to use for everyone!

Realizar los cálculos con prometheus no es fácil. Lo que hace pyrra es usar recording rules para realizar cálculos intermedios.

Ejemplo con CRD:

```yaml
apiVersion: pyrra.dev/v1alpha1
kind: ServiceLevelObjective
metadata:
  name: ad-availability
  namespace: otel-astronomy-shop
  labels:
    prometheus: prometheus-demo
spec:
  target: "99.0" # Objetivo de disponibilidad
  window: 2w     # Ventana de 2 semanas
  description: "Disponibilidad del AD Service (Basado en Trazas SERVER)"
  indicator:
    ratio:
      errors:
        metric: traces_spanmetrics_calls_total{service_name="ad", span_kind="SPAN_KIND_SERVER", status_code="STATUS_CODE_ERROR"}
      total:
        metric: traces_spanmetrics_calls_total{service_name="ad", span_kind="SPAN_KIND_SERVER"}

```
