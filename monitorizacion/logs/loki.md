<https://grafana.com/oss/loki/>
Almacenamiento de logs

Elasticsearch/Splunk tienen muchas más funcionalidades y más rápidos en las respuestas, loki está más orientado ciertos casos de uso.
Loki es más barato a nivel de recursos.

Orientado a devops, monitorización de infra, troubleshooting, monitorizar apps.
Alertas sobre logs.
Extraer métricas de los logs (menos potente que es/splunk).
Eficiente.
Path de ingesta y query distintos, para escalar bien.
Se integra bien con el resto de cosas de grafana, para poder saltar de unas cosas a otras sencillamente.

El formato de indexado funciona con labels.
Lo que indexa por labels es muy rápido. En caso contrario, búsqueda bruta, orden de segundos.

Ejemplo de que extraría de un server web:
FECHA {foo=bar, baz=bar} GET /about 505

Entre llaves serán las etiquetas que se añaden, que luego será lo que se indexe.
Se pueden sacar dinámicamente valores de la traza hacia la label.
Cuidado con la cardinalidad (los valores distintos) de cada label.

El índice se almancena en memoria.

Se usa un object storage.

# API

Obener todos los logs para un OrgId determinado:

```bash
curl "http://127.0.0.1:3100/loki/api/v1/query_range" --data-urlencode 'query={job=~".+"}' -H X-Scope-OrgId:default | jq '.data.result[].values'
```

# CLI

```bash
logcli
```

List all label names

```bash
logcli labels
```

List all values for a specific label (e.g., job)

```bash
logcli labels job
```

Show all:

```bash
logcli query '{job=~".+"}' --since=1h
```

# Limitaciones ingestión

Hay ciertas limitaciones de las fechas en las que puedes ingestar datos

<https://community.grafana.com/t/getting-entry-too-far-behind-even-if-reject-old-samples-and-reject-old-samples-max-age-should-allow/146706>
