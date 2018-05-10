http://www.brendangregg.com/blog/2017-08-08/linux-load-averages.html
El "load" de uptime, top, /proc/loadavg es un "system load", no solo se refiere a la carga de la CPU.
En el recuento de procesos encolados, están los listos para correr más los de estado uninterruptible sleep.
Estos últimos son IO pero también algunos tipos de lock y otros.
El valor podemos verlo como un valor de la carga de la máquina, pero no debemos intentar mapearlo con un tipo de recurso determinado.


Mirar cpu/loadavg.md para entender el significado de los valores de uptime.


Para generar carga en una máquina.

Ponerla al 100%
yes >& /dev/null &

Pone una cpu al 100%
dd if=/dev/urandom | bzip2 -9 >> /dev/null

Tuesta por exceso de syscalls
dd if=/dev/zero of=/dev/null


Ver
stress.md
spew.md
