Ejemplo de configuración de un site:

server {
	listen 80 default;
	location /static { root /usr/local/share/rack/example/static; }
	location / { proxy_pass http://127.0.0.1:8080; }
}
