http://php-fpm.org/

A simple and robust FastCGI Process Manager for PHP

Por defecto abre un socket root:root

Para cambiar el owner y group de los que puede conectar a ese socket:
/etc/php5/fpm/pool.d/www.conf
listen.owner = www-data
listen.group = www-data
listen.mode = 0660



# Limitar en tiempo
php_value[max_execution_time] = 300
Limita a 300s el tiempo máximo de ejecucción de un script php.
CUIDADO!
sólo afectan el tiempo de ejecución del script mismo. Todo el tiempo dedicado a la actividad que ocurre fuera de la ejecución del script, como las llamadas al sistema usando system(), operaciones de secuencia, consultas a la bases de datos, etc. No se incluyen cuando se determina el tiempo máximo del script en funcionamiento. Esto no es cierto en Windows, donde el tiempo medido es real.


A nivel php-fpm podemos poner:
request_terminate_timeout
The timeout for serving a single request after which the worker process will be killed. This option should be used when the 'max_execution_time' ini option does not stop script execution for some reason. A value of '0' means 'Off'. Available units: s(econds)(default), m(inutes), h(ours), or d(ays). Default value: 0.

Este límite hace un SIGTERM del hijo, por lo que no sale ordenadamente. Si estaba haciendo una query a una bbdd, se quedará en ejecucción.


# Status
https://stackoverflow.com/questions/15023540/how-to-determine-which-script-is-being-executed-in-php-fpm-process
Activar un endpoint para obtener info de los workers

Consultar el estado FULL a mano:
SCRIPT_NAME=/status QUERY_STRING=full SCRIPT_FILENAME=/status? REQUEST_METHOD=GET cgi-fcgi -bind -connect 127.0.0.1:9000


# Lanzar peticiones directamaente al protocolo de FCGI
SCRIPT_NAME=/status SCRIPT_FILENAME=/status REQUEST_METHOD=GET cgi-fcgi -bind -connect 127.0.0.1:9000

Para instalarlo:
pacman -S fcgi
yum install -y fcgi


# Formato log
/etc/php-fpm.d/www.conf
access.format = '"%{REMOTE_ADDR}e - - [%t] \"%m %r%Q%q\" %s %l \"%{HTTP_REFERER}e\" \"%{HTTP_USER_AGENT}e\" %{mili}dT PID=%p MEM=%{kilo}M CPU=%C%%"'

https://www.php.net/manual/es/install.fpm.configuration.php#122456

https://www.tothenew.com/blog/php5-fpm-logging/
%t : server time of receiving request
