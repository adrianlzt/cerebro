http://sourceforge.net/projects/preload/
http://techthrob.com/2009/03/drastically-speed-up-your-linux-system-with-preload/
http://askubuntu.com/questions/110335/drawbacks-of-using-preload-why-isnt-it-included-by-default
http://www.hecticgeek.com/2013/05/using-preload-ubuntu-13-04/

Analiza el uso de aplicaciones que hacemos en el sistema.
Carga en memoria las aplicaciones que vayamos a usar antes de abrirlas, así tendremos una carga más rápida.

apt-get install preload


/var/lib/preload/preload.state
Lo que está cacheando

/etc/preload.conf

/var/log/preload.log


Competencia: http://www.freedesktop.org/software/systemd/man/systemd-readahead.html
