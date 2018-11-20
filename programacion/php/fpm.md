https://php-fpm.org/
http://be2.php.net/manual/en/book.fpm.php
PHP-FPM (FastCGI Process Manager) is an alternative PHP FastCGI implementation with some additional features useful for sites of any size, especially busier sites.

Típicamente ejecutaremos un servidor web apache o nginx que se comunicará via socket (usando lenguaje FastCGI) con php-fpm.

# Metrics
https://www.thatsgeeky.com/2012/02/directly-connecting-to-php-fpm/#talking-to-your-fastcgi-server

Se puede activar un endpoint con métricas:
pm.status_path = /status

En el link se explica que es cada métrica


# TCP
Si conectamos mediante TCP tenedremos que habilitar una IP en el listen.
Comprobar que llegamos desde el cliente hasta la IP donde escucha el server (está escuchando solo en localhost?)

Cuidado no tengamos registringidas las IPs que pueden realizar las llamadas:
listen.allowed_clients


# Conex manual
pacman -S extra/fcgi

SCRIPT_NAME=/ping SCRIPT_FILENAME=/ping REQUEST_METHOD=GET cgi-fcgi -bind -connect 127.0.0.1:9000

Una llamada capturada a nginx contra php-fpm con esta config
    location ~ \.php$ {
        root           html;
        fastcgi_pass   172.17.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        include        fastcgi_params;
    }


SCRIPT_FILENAME=/scripts/index.php
QUERY_STRING=
REQUEST_METHOD=GET
CONTENT_TYPE=
CONTENT_LENGTH=
SCRIPT_NAME=/index.php
REQUEST_URI=/index.php
DOCUMENT_URI=/index.php
DOCUMENT_ROOT=/etc/nginx/html
SERVER_PROTOCOL=HTTP/1.1
REQUEST_SCHEME=http
GATEWAY_INTERFACE=CGI/1.1
SERVER_SOFTWARE=nginx/1.13.7
REMOTE_ADDR=172.17.0.1
REMOTE_PORT=45220
SERVER_ADDR=172.17.0.3
SERVER_PORT=80
SERVER_NAME=localhost
REDIRECT_STATUS=200
HTTP_HOST=172.17.0.3
HTTP_USER_AGENT=curl/7.56.1
HTTP_ACCEPT=*/*



# Docker
https://developers.redhat.com/blog/2014/12/29/running-php-fpm-in-docker/

Como correr php-fpm como un container standalone


# Access log
Valores configurables:
https://github.com/php/php-src/blob/PHP-5.4.16/sapi/fpm/php-fpm.conf.in#L369


Ejemplo de config:

access.log = "/var/log/php-fpm/access.log"
; %e: HTTP headers like: %{HTTP_HOST}e or %{HTTP_USER_AGENT}e
; dos guiones para identity y user (el primero no existe en php y el segundo no lo usamos, y php, si no tiene, pone un espacio en blanco)
; %t: tiempo
; %m: request method
; %r: the request URI (without the query string, see %q and %Q)
; %q: the query string
; %Q: the '?' character if query string exists
; %s: status (response code)
; %l: content-length of the request (for POST request only)
; %d: time taken to serve the request
; %p: PID of the child that serviced the request
; %M: peak of memory allocated by PHP
; %C: %CPU used by the request
access.format = "%{REMOTE_ADDR}e - - [%t] \"%m %r%Q%q\" %s %l \"%{HTTP_REFERER}e\" \"%{HTTP_USER_AGENT}e\" %{mili}dT PID=%p MEM=%{kilo}M CPU=%C%%"
