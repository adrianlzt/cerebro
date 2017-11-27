https://php-fpm.org/
http://be2.php.net/manual/en/book.fpm.php
PHP-FPM (FastCGI Process Manager) is an alternative PHP FastCGI implementation with some additional features useful for sites of any size, especially busier sites.

Típicamente ejecutaremos un servidor web apache o nginx que se comunicará via socket (usando lenguaje FastCGI) con php-fpm.

# Metrics
https://www.thatsgeeky.com/2012/02/directly-connecting-to-php-fpm/#talking-to-your-fastcgi-server

Se puede activar un endpoint con métricas:
pm.status_path = /status

En el link se explica que es cada métrica



# Conex manual
pacman -S extra/fcgi

SCRIPT_NAME=/ping SCRIPT_FILENAME=/ping REQUEST_METHOD=GET cgi-fcgi -bind -connect 127.0.0.1:9000



# Docker
https://developers.redhat.com/blog/2014/12/29/running-php-fpm-in-docker/

Como correr php-fpm como un container standalone
