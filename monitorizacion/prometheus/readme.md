https://prometheus.io
https://developers.soundcloud.com/blog/prometheus-monitoring-at-soundcloud
https://hub.docker.com/r/prom/prometheus/
https://www.youtube.com/watch?v=qMwdwHiuzsc


La idea es instrumentalizar el software para que exponga las métricas en formato prometheus, luego el server prometheus las leera de ahí.
Este ofrece un dash para crear graficas siguendo un query language parecido a graphite.
Tambien ofrecen un alertmanager

Para aplicaciones short-lived, existe un pushgateway para que luego prometheus las recoga de alli.

Parece que prometheus esta estandarizando un poco como se deben exponer las métricas (mismo formato que OpenTSDB)
https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels
https://prometheus.io/docs/instrumenting/writing_exporters/

Luego otros agentes (Telegraf por ejemplo) pueden leer ese formato.

Lo estandar es publicar las métricas en: URL/metrics
Ejemplo de métricas: http://demo.robustperception.io:9090/metrics


Prometheus tambien tiene service discovery para automaticamente recolectar métricas de nuevos servicios que aparezcan (mediante DNS, kubernetes, Consul, custom, etc).

Tiene una interfaz web y una API donde lanzar queries en su lenguaje para obtener las métricas.
Lo típico es conectarle Grafana.

La gran ventaja de los exporters es que corren dentro del aplicativo, por lo que pueden recolectar info sobre todas las requests y sacar un estadístico, mientras que un sistema blackbox podría estar perdiendo métricas entre los tiempos de muestreo.


El formato de métricas no usa json por que era muy lento.



# Discovery
En kubernetes parace que lo que hace es obtener una lista de todos los services y preguntar a ver si tienen un endppoint /metrics
