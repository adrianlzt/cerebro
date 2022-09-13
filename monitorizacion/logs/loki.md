https://grafana.com/oss/loki/
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
FECHA {foo=bar, baz=bar}  GET /about 505

Entre llaves serán las etiquetas que se añaden, que luego será lo que se indexe.
Se pueden sacar dinámicamente valores de la traza hacia la label.
Cuidado con la cardinalidad (los valores distintos) de cada label.

El índice se almancena en memoria.

Se usa un object storage.
