https://registry.hub.docker.com/_/logstash/

docker run -it --rm -v "$PWD":/config-dir logstash logstash -f /config-dir/logstash.conf

