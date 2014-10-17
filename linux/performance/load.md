Mirar cpu/loadavg.md para entender el significado de los valores de uptime.


Para generar carga en una máquina.

Ponerla al 100%
yes >& /dev/null &

Generar una carga del 50% aprox
dd if=/dev/urandom | bzip2 -9 >> /dev/null
  urandom solo saca bloques si hay entropía.

Tuesta por exceso de syscalls
dd if=/dev/zero of=/dev/null


Ver 
stress.md
spew.md
