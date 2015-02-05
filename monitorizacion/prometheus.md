https://developers.soundcloud.com/blog/prometheus-monitoring-at-soundcloud?utm_content=buffer9d4b4&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer

La idea es instrumentalizar el software para que envíe las métricas a prometheus.
Este ofrece un dash para crear graficas siguendo un query language parecido a graphite.
Tambien ofrecen un alertmanager

Para aplicaciones short-lived, existe un pushgateway para que luego prometheus las recoga de alli.
Para el resto parece que es prometheus quien va a leerlas.

La idea es poder levantar prometheus donde se quiera para monitorizar lo que sea, en vez de una instancia unica.
