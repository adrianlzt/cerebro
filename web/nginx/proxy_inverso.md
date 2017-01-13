# Coge las peticiones del puerto 80 y las reenvia al 8153
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:8153;
    }
}

