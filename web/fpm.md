http://php-fpm.org/

A simple and robust FastCGI Process Manager for PHP

Por defecto abre un socket root:root

Para cambiar el owner y group de los que puede conectar a ese socket:
/etc/php5/fpm/pool.d/www.conf
listen.owner = www-data
listen.group = www-data
listen.mode = 0660

