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

Si cargamos datos con el mimirtool backfill, los datos no estarán disponibles hasta que se haga una sincronización de los TSDB

Esto lo sabremos porque veremos en el log:

```
ts=2026-02-10T13:28:24.204161052Z caller=gateway.go:342 level=info msg="synchronizing TSDB blocks for all users" reason=periodic
ts=2026-02-10T13:28:24.205019098Z caller=bucket_index_metadata_fetcher.go:97 level=info msg="loaded bucket index" user=ORG updatedAt=1770730087
ts=2026-02-10T13:28:24.20540556Z caller=bucket_index_metadata_fetcher.go:97 level=info msg="loaded bucket index" user=anonymous updatedAt=1770730087
ts=2026-02-10T13:28:24.205547957Z caller=gateway.go:348 level=info msg="successfully synchronized TSDB blocks for all users" reason=periodic
```

Se puede cambiar con:

```yaml
blocks_storage:
  bucket_store:
    sync_interval: 1m
```
