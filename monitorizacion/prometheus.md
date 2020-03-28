https://prometheus.io
https://developers.soundcloud.com/blog/prometheus-monitoring-at-soundcloud
https://hub.docker.com/r/prom/prometheus/
https://www.youtube.com/watch?v=qMwdwHiuzsc


La idea es instrumentalizar el software para que exponga las métricas en formato prometheus, luego el server prometheus las leera de ahí.
Este ofrece un dash para crear graficas siguendo un query language parecido a graphite.
Tambien ofrecen un alertmanager

Para aplicaciones short-lived, existe un pushgateway para que luego prometheus las recoga de alli.

Parece que prometheus esta estandarizando un poco como se deben exponer las métricas.
Luego otros agentes (Telegraf por ejemplo) pueden leer ese formato.

Lo estandar es publicar las métricas en: URL/metrics
Ejemplo de métricas: http://demo.robustperception.io:9090/metrics


Prometheus tambien tiene service discovery para automaticamente recolectar métricas de nuevos servicios que aparezcan (mediante DNS, kubernetes, Consul, custom, etc).

Tiene una interfaz web y una API donde lanzar queries en su lenguaje para obtener las métricas.
Lo típico es conectarle Grafana.

La gran ventaja de los exporters es que corren dentro del aplicativo, por lo que pueden recolectar info sobre todas las requests y sacar un estadístico, mientras que un sistema blackbox podría estar perdiendo métricas entre los tiempos de muestreo.


El formato de métricas no usa json por que era muy lento.


# Dudas
para la cpu, el exporter es un contador?
interesante para no perderse picos de cpu?



# Query

## query_range
query_range?query=fuerza_peso&start=1584950052&end=1584950062&step=0.5
Nos devuelve un punto cada 500ms entre esas unix epoch.
Aunque tengamos más o menos resolución, nos devolverá un punto cada 500ms.
Si tenemos menos puntos, el valor será el mismo.


## Raw
Nos devuelve todos lo puntos del último minuto de la serie "fuerza_peso"
curl '127.0.0.1:8428/api/v1/query?query=fuerza_peso[1m]' | python -m json.tool

