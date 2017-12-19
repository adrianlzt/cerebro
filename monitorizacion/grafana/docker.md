https://hub.docker.com/r/grafana/grafana/
https://github.com/grafana/grafana-docker

docker run -d -p 3000:3000 grafana/grafana

Con SSL
docker run -d -p 3000:3000 -e "GF_SERVER_PROTOCOL=https" -e "GF_SERVER_CERT_FILE=/etc/ssl/grafana.pem" -e "GF_SERVER_CERT_KEY=/etc/ssl/grafana.key" --name=grafana -v /home/rancher/letsencrypt/xxx.duckdns.org/fullchain.pem:/etc/ssl/grafana.pem:ro -v /home/rancher/letsencrypt/xxx.duckdns.org/privkey.pem:/etc/ssl/grafana.key:ro -v /home/rancher/grafana:/var/lib/grafana grafana/grafana

user: admin
pass: admin


Si vamos a conectar con un volumen influx, es posible que tengamos que pasarle la ip enterna del docker host.


Si queremos agregar un plugin podemos entrar con docker exec, instalarlo y luego hacer un docker restart sobre el container.
