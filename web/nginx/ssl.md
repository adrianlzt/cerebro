http://nginx.org/en/docs/http/configuring_https_servers.html
https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04



https://cipherli.st/
Strong Ciphers for Apache, nginx and Lighttpd


# Por defecto nginx acepta mas (openssl ciphers -v 'HIGH:!aNULL:!MD5') (http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_ciphers)
ssl_ciphers                 "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";

# Fichero necesario para ciphers DHE. Se genera con: openssl dhparam -out dhparams.pem 4096
ssl_dhparam                 /etc/ssl/certs/dhparam.pem;

# El servidor es el que elige los ciphers (por defecto esta off, por lo tanto es el cliente) (http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_prefer_server_ciphers)
ssl_prefer_server_ciphers   on;

# No usar una funcionalidad de restaurar una sesion anterior https://timtaubert.de/blog/2014/11/the-sad-state-of-server-side-tls-session-resumption-implementations/ http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_session_tickets
ssl_session_tickets off;

# Creamos una cache que se llama "SSL" de 10MB (unas 40000 sesiones) reutilizable por los workers (si reusamos el nombre puede ser reutilizada entre distintos vhosts) (http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_session_cache)
ssl_session_cache           shared:SSL:10m;

# HSTS, le dice al navegador que use siempre HTTPS, incluidos los subdominios (https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet)
add_header                  Strict-Transport-Security "max-age=63072000; includeSubDomains";

# Le dice al navegador que no debe renderizar paginas en <frame>, <iframe> o <object> (https://developer.mozilla.org/es/docs/Web/HTTP/Headers/X-Frame-Options)
add_header                  X-Frame-Options DENY;

# Le dice al navegador que no intente adivinar que tipo de fichero esta bajando y se fie del Content-Type (https://developer.mozilla.org/es/docs/Web/HTTP/Headers/X-Content-Type-Options)
add_header                  X-Content-Type-Options nosniff;




Otros parámetros que podemos configurar:

# Por defecto se usa la de 256bits que parece suficiente: http://security.stackexchange.com/questions/78621/which-elliptic-curve-should-i-use
ssl_ecdh_curve secp384r1;

# El servidor envia un justificante de que su certificado sigue siendo valido, para evitar al cliente tener que consultarlo https://en.wikipedia.org/wiki/OCSP_stapling (http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_stapling)
# El nginx tiene que consultar con la CA estos datos
ssl_stapling                on;
ssl_stapling_verify         on;
resolver                    $DNS-IP-1 $DNS-IP-2 valid=300s;
resolver_timeout            5s;

ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Este parametro va por defecto así. SSLv2 y SSLv3 son inseguros. http://nginx.org/en/docs/http/configuring_https_servers.html#compatibility. A partir del 25/5/2015 (https://github.com/nginx/nginx/commit/724f0f028eabc32a343c4c43f38450963f623ad2)



# Crear fichero dhparam.pem
openssl dhparam -out dhparam.pem 4096


# Crear certificado autofirmado
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/cert.key -out /etc/nginx/cert.pem

# Configuracion con ssl seguro (mirar arriba que otras opciones debemos/podemos meter)
server {
        listen 443 ssl default_server;
        listen [::]:443 ssl default_server;
        ssl_certificate /etc/letsencrypt/live/xxxx.org/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/keys/0000_key-certbot.pem;
        ssl_prefer_server_ciphers on;
        ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
        ssl_session_cache shared:SSL:10m;
        ssl_session_tickets off;
        root /var/www/html;
        server_name _;
}
