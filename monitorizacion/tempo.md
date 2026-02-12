<https://grafana.com/oss/tempo/>

Acepta opentelemetry y jaeger.
No hace falta hacer sampling.

Ejemplo de como arrancar un tempo en un solo proceso, con storage local y configurado para poder realizar queries rápidamente (las llamadas a search dependen de que los datos estén "compactados"?)
<https://gist.github.com/adrianlzt/8cb0ff2f1fcf78145705bdf9decab521>

# Query / TraceQL

<https://grafana.com/docs/grafana/latest/datasources/tempo/query-editor/>

<https://grafana.com/docs/tempo/latest/traceql/>

# Flow de datos

Cuando enviamos datos estos se almacenan en ficheros WAL.

Luego el "compactator" los va agrupando en compacted blocks.

Los datos que esten en WAL no los podemos encontrar vía la Search API (si mediante query by id).
