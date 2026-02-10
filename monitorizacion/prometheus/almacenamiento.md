Problemas almacenamiento por defecto:
Almacenar más de 14 días
Almacenar de distintas fuentes.
Escalabilidad

<https://grafana.com/oss/mimir/>
Basado en cortex
Forkeado desde cortex para cambiar apache a GPL.

victoria metrics
Más rápido que mimir, pero con menos funcionalidad y no escala.
<https://victoriametrics.com/blog/mimir-benchmark/>

cortex
thanos

# Debug

```yaml
server:
# Only log messages with the given severity or above. Valid levels: [debug,
# info, warn, error]
# CLI flag: -log.level
  [log_level: <string> | default = "info"]
```

# WAL - TSDB

Por defecto prometheus almacena los datos en ficheros WAL y cada n horas (típicamente 2) hace la compatación a bloques inmutables (TSDB).
