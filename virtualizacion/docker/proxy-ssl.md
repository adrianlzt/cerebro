Container para poner una entrada SSL que despues redirija el trafico a otro container:
https://hub.docker.com/r/adrianlzt/docker-ssl-proxy/
https://github.com/adrianlzt/docker-ssl-proxy

Ejemplo:
docker run --restart=unless-stopped -d -e "CUSTOM_CERTS=1" -e "TARGET_PORT=6010" -e "TARGET_HOST=172.17.0.1" -v "/home/test/certs/:/etc/nginx/certs/" -p 443:443 adrianlzt/docker-ssl-proxy


Para algo más elaborado, gestionando automáticamente nuevos containers mirar:
web/caddy/docker.md



# Server docker via proxy
sudo systemctl edit docker

[Service]
Environment="HTTP_PROXY=http://localhost:8086/"

sudo systemctl restart docker
