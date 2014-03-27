https://medium.com/what-i-learned-building/e855bc08975d

Logging with Logstash, ElasticSearch, Kibana and Redis


http://www.elasticsearch.org/webinars/introduction-to-logstash/?watch=1
Instalar y configurar elasticsearch y kibana.
Mirar 
  web/elasticsearch/instalacion.md
  web/elasticsearch/plugins.md
  web/elasticsearch/kibana.md


Descargar logstash: http://www.elasticsearch.org/overview/elkdownloads/
Bajar e instalar el .deb/.rpm
El .deb instala logstash en /opt/logstash
También nos crea el rotatelog, scripts de init.d, el directorio de /var/log/logstash, y los directorios de configuración (vacíos) /etc/logstash
Tiene como dependencia default-jre-headless
Recomiendan usar java-1.7.0_45 como mínimo, aunque funciona con versiones menores.

Seguir en config.md
