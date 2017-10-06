https://github.com/lmenezes/cerebro
  elasticsearch web admin tool built using Scala, Play Framework, AngularJS and Bootstrap. needs Java 1.8 or newer to run.


https://github.com/lmenezes/elasticsearch-kopf
  Kopf is no longer maintained. A replacement(cerebro) has been developed
  kopf is a simple web administration tool for elasticsearch written in JavaScript + AngularJS + jQuery + Twitter bootstrap.


https://blog.openshift.com/managing-elasticsearch-with-kopf-in-openshift-origin-3-6/


# Cerebro
wget https://github.com/lmenezes/cerebro/releases/download/v0.6.8/cerebro-0.6.8.tgz
  buscar en https://github.com/lmenezes/cerebro/releases la última release

cd cerebro/
bin/cerebro
http://localhost:9000/

Solo admite autenticatión por user/password (entiendo que auth basic)

Tiene una vista general del cluster.
Una vista para los nodos con su info de consumo de memoria, cpu, disco.
Una interfaz para enviar peticiones REST a las APIs de ES
Creación de índices
Gestión de los parámetros del cluster (secciones de routing, discovery, circuit breaker, recovery, ttl)
Aliases
Analyzer (no se para que es)
Templates
Repositories (?)
Snapshots
interfaz web para mostrar las cat apis
