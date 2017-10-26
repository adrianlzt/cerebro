https://www.docker.elastic.co/

docker pull docker.elastic.co/logstash/logstash:5.6.3
docker run -it --rm -v "$PWD":/config-dir logstash logstash -f /config-dir/logstash.conf

Plugins instalados:
docker run --entrypoint ls --rm -it docker.elastic.co/logstash/logstash:5.6.3 /usr/share/logstash/vendor/bundle/jruby/1.9/specifications/ | grep logst


Configurar los pipeline (inputs/filters/outputs):
docker run --rm -it -e "XPACK_MONITORING_ENABLED=false" -v ~/pipeline/:/usr/share/logstash/pipeline/ docker.elastic.co/logstash/logstash:5.6.3

Por defecto solo tiene un fichero, /usr/share/logstash/pipeline/logstash.conf
input {
  beats {
    port => 5044
  }
}

output {
  stdout {
    codec => rubydebug
  }
}



Pasarle settings a logstash (https://www.elastic.co/guide/en/logstash/5.6/logstash-settings-file.html):
docker run --rm -it -e "XPACK_MONITORING_ENABLED=false" -v ~/settings/:/usr/share/logstash/config/ docker.elastic.co/logstash/logstash:5.6.3
docker run --rm -it -e "XPACK_MONITORING_ENABLED=false" -v ~/settings/logstash.yml:/usr/share/logstash/config/logstash.yml docker.elastic.co/logstash/logstash:5.6.3

Las variables de entorno que pasemos modificaran en el arranque el fichero logstash.yaml usando https://github.com/elastic/logstash-docker/blob/master/build/logstash/env2yaml/env2yaml.go
CUIDADO! si montamos un fichero con un mount bind, las variables de entorno se podrán encima de ese fichero.

Fichero de settings por defecto:
/usr/share/logstash/config/logstash.yml


