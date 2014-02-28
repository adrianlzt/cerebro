https://collectd.org/wiki/index.php/Filter
http://collectd.org/documentation/manpages/collectd.conf.5.shtml#filter_configuration

Es la idea de cadenas de iptables.

Dos cadenas disponibles pre-cache, post-cache.
  pre-cache se ejecuta antes de meter los datos en la cache global de collectd. Ciertos plugins usan la cache para obtener sus valores.

Los dos conceptos más importantes son "Match" y "Target".
  Match, formas de conseguir que un valor empieze una cadena
  Target, acciones a realizar para ese valor
    Crear notificaciones
    modificar el host, plugin, plugin instance o type instance


Ejemplos de uso

  no escribir en los ficheros rrd las estadísticas de MySQL relacionadas con el comando "show_*"

  eliminar datos con timestamp antiguo (por ejemplo datos recibidos de otros clientes a nuestro collectd)
  
