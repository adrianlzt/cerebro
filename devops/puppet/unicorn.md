Podemos usar nginx+unicorn en vez del puppetmaster.


Para activar el debug en este entorno:
/etc/puppet/config.ru
ARGV << "--debug"


Cada instancia unicorn consume unos 500MB de RSS y unos 700MB de VSZ.

Para 14 workers:
El master 850MB de RSS y 1GB de VSZ.
Unos 10 workers tendrán unos 500MB de consumo RSS y 700MB VSZ.
Los otros 4 unos 30MB RSS y 600MB de VSZ.

/etc/puppet/unicorn.conf
worker_processes 14
