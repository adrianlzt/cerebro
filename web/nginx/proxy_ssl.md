server {
    listen       443;
    server_name  _;

    ssl                  on;
    ssl_certificate      cert.crt;
    ssl_certificate_key  cert.key;

    ssl_session_timeout  5m;

    ssl_protocols  SSLv2 SSLv3 TLSv1;
    ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
    ssl_prefer_server_ciphers   on;

    location / {
        proxy_pass http://127.0.0.1:8080;
    }
}


# Mirar certificados/crear_cert_autofirmado.md para generar el cert.pem/key
# Comando para crear clave y cert autofirmado:
# sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/cert.key -out /etc/nginx/cert.crt
