https://prometheus.io
https://developers.soundcloud.com/blog/prometheus-monitoring-at-soundcloud
https://hub.docker.com/r/prom/prometheus/


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
