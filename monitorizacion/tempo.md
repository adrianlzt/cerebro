<https://grafana.com/oss/tempo/>

Acepta opentelemetry y jaeger.
No hace falta hacer sampling.

Ejemplo de como arrancar un tempo en un solo proceso, con storage local y configurado para poder realizar queries rápidamente (las llamadas a search dependen de que los datos estén "compactados"?)
<https://gist.github.com/adrianlzt/8cb0ff2f1fcf78145705bdf9decab521>

Que pasa al insertar una traza del pasado:
Cause 1: Block Metadata Timestamp Adjustment
tempodb/encoding/v2/wal_block.go:377-396 - When a trace timestamp is older than now - ingestionSlack (default 2 min), Tempo replaces it with now for block metadata.

Cause 2: Ingester Query Filtering
modules/frontend/search_sharder.go:201-206 - With query_ingesters_until: 2h, ingester queries are skipped for timestamps older than 2 hours from now.

Result: Traces with old timestamps are stored but invisible to search queries because:

1. Block metadata shows "now" instead of actual timestamp
2. Ingester query is skipped for old timestamps
3. Backend query finds no matching blocks

| Config | Purpose |
|--------|---------|
| storage.trace.wal.ingestion_time_range_slack: 87600h | Prevents timestamp replacement in block metadata |
| query_frontend.search.query_ingesters_until: 87600h | Always queries ingester regardless of timestamp |
| compactor.compaction.block_retention: 87600h | Prevents immediate deletion of blocks with old timestamps |

# Query / TraceQL

<https://grafana.com/docs/grafana/latest/datasources/tempo/query-editor/>

<https://grafana.com/docs/tempo/latest/traceql/>

# Flow de datos

Cuando enviamos datos estos se almacenan en ficheros WAL.

Luego el "compactator" los va agrupando en compacted blocks.

Los datos que esten en WAL no los podemos encontrar vía la Search API (si mediante query by id).

Si ingestamos datos del pasado tenemos problemas.
Estarán almacenados un tiempo en los ingesters, pero serán datos antiguos, por lo que podemos confundir a tempo y que no los encuentre (pensará que deben estar en los backend).
