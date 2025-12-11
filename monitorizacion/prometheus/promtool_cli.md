https://prometheus.io/docs/prometheus/latest/command-line/promtool/#promtool-query

```bash
promtool query instant http://localhost:9090 'up{job="prometheus"}'
promtool query instant http://localhost:9090 'rate(http_requests_total[5m])'
# --time accepts RFC3339 or Unix timestamp
promtool query instant http://localhost:9090 'up' --time="2023-10-27T12:00:00Z"
```

Range

```bash
promtool query range <server-url> <promql-expression> --start=<time> --end=<time> --step=<duration>
promtool query range http://localhost:9090 'rate(http_requests_total[1m])' \
  --start=$(date -d "10 minutes ago" +%s) \
  --end=$(date +%s) \
  --step=1m
```

Series:

```bash
promtool query series http://localhost:9090 --match='http_requests_total'
promtool query series http://localhost:9090 --match='{job="node_exporter"}'
```

Labels:

```bash
promtool query labels http://localhost:9090
```
