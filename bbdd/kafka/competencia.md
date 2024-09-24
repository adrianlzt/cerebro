flink

<https://redpanda.com/>
Redpanda is a Kafka®-compatible streaming data platform that is up to 10x faster and 6x more hardware-efficient. It is also JVM-free, ZooKeeper®-free, Jepsen-tested and source available.

# CLI

curl -LO <https://github.com/redpanda-data/redpanda/releases/latest/download/rpk-linux-amd64.zip>
aur/redpanda-bin

rpk cluster info --brokers 127.0.0.1:19092

Enviar mensaje (nos dejará la shell sin retornar para que pongamos un mensaje y demos a enter, podemos hacerlo varias, veces, control+c para salir):
rpk --brokers 127.0.0.1:19092 topic produce pruebas

Crear topic:

```
rpk topic create NOMBRE
```

Ingestar datos:

```
curl -H "Content-Type: application/vnd.kafka.json.v2+json" 10.0.2.183:8082/topics/adrian -d '{ "records": [ { "value": { "CollectionTime": "1726482720", "Device": { "DeviceInfo": { "Manufacturer": "TP-Link" } } } }, { "value": { "CollectionTime": "1726482721", "Device": { "DeviceInfo": { "Manufacturer": "Off-TW" } } } } ] }'
```

# Web UI

```bash
kubectl --namespace redpanda port-forward svc/redpanda-console 8080:8080
```

# Redpanda connect

<https://docs.redpanda.com/redpanda-connect/components/about/>

Es una aplicación a parte para hacer ETLs.
Puedes ingestar de distintos inputs (si queremos ingestar de redpanda usar kafka_franz), hacer procesamientos e ingestar a distintos outputs.

El lenguaje que usa para las transformaciones es _bloblang_: <https://docs.redpanda.com/redpanda-connect/guides/bloblang/functions/#content>

Ejemplo ingestando de un topic de redpanda y escribiendo un JSONB en postgresql:

```
input:
  label: ""
  kafka_franz:
    seed_brokers:
      - redpanda-0.redpanda.redpanda.svc.cluster.local.:9093
      - redpanda-1.redpanda.redpanda.svc.cluster.local.:9093
      - redpanda-2.redpanda.redpanda.svc.cluster.local.:9093
    topics:
      - mytopic
    consumer_group: ""

pipeline:
  processors: []

output:
  broker:
    copies: 1
    pattern: fan_out # enviar a los dos outputs
    outputs:
      - stdout:
          codec: lines
      - sql_insert:
          driver: postgres
          dsn: "postgres://postgres:password@cluster.timescaledb.svc.cluster.local:5432/postgres?sslmode=disable"
          table: reports
          columns:
            - report
          args_mapping: root = [json().string()]
          init_statement: |
            CREATE TABLE IF NOT EXISTS reports (
              report JSONB,
              time TIMESTAMPTZ DEFAULT now()
            );
          batching:
            count: 3
            period: 1s
```
