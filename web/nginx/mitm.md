https://gist.github.com/vgmoose/125271f1d9e4a1269454a64095b9e4a1

Arrancar un nginx escuchando en http que reenvia aun https.
Por si queremos hacer un MiTM cuando controlamos el endpoint destino.

docker run --rm -it --net host -v "$PWD/config:/etc/nginx/nginx.conf" nginx

events {
    worker_connections  1024;
}

http {
  server {
      listen 8080;
      location / {
          proxy_pass https://prometheus-prod-01-eu-west-0.grafana.net;
      }
  }
}

