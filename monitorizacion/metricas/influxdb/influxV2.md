Borrar métricas:
influx delete -t MITOKEN -o MIORG --bucket NOMBREBUCKET --host https://europe-west1-1.gcp.cloud2.influxdata.com --predicate '_measurement="errors"' --start '1970-01-01T00:00:00Z' --stop '2022-01-01T00:00:00Z'
