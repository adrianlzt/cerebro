# Coge las peticiones del puerto 80 y las reenvia al 8153
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:8153;

        # Cabeceras que agregamos para que el server final sepa de donde viene la peticion
        proxy_set_header Host $host; // Pone en la cabcera "Host" lo que pidio el cliente. Si no defimos esto, esta cabecera llevará el hostname puesto en el proxy_pass
        proxy_set_header X-Real-IP $remote_addr; # IP del cliente que ataco al proxy
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # Cabecera donde se van agregando los forwards (por si ya viene de hacer otro forward, no perder esa info)
        proxy_set_header X-Forwarded-Proto $scheme; # Envia si el cliente uso http o https

        # Por si tenemos que reescribir un header de respuesta tipo "Location" o "Refresh". (http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_redirect)
        # Caso tipico cuando se manda un redirect al usuario, pero como esta usando un proxy, tenemos que reescribir para que apunte al proxy, no al original
        proxy_redirect off;

        proxy_connect_timeout 90; # Por defecto 60s
        proxy_send_timeout 90; # Por defecto 60s
        proxy_read_timeout 90; # Por defecto 60s

        client_max_body_size 10m;
        client_body_buffer_size 128k;

        proxy_buffer_size 4k;
        proxy_buffers 4 32k;
        proxy_busy_buffers_size 64k;
    }
}

