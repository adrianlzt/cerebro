https://www.fluentd.org/plugins/all

La mayoría de los plugins no vienen integrados y deberemos instalarlos como una gema aparte.


# Elasticsearch
https://github.com/uken/fluent-plugin-elasticsearch
version >= 2.0.0 para fluentd >= v0.14.0  
version < 2.0.0 para fluentd >= v0.12.0  

gem install fluent-plugin-elasticsearch
gem install fluent-plugin-elasticsearch --version 2.0.0.rc.5

Usa un cliente llamado "Farady".
Para hacer los envios hace uso de la API de /_bulk

CUIDADO! si ES tarda mucho en contestar puede reenviar trazas (por defecto espera 5")
Para hacer pruebas:
sudo nsenter -t 4262 -n tc qdisc add dev eth0 root netem delay 4700ms 1000ms
