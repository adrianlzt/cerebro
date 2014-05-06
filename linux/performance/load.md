Para generar carga en una máquina.

Ponerla al 100%
yes >& /dev/null &

Generar una carga del 50% aprox
dd if=/dev/urandom | bzip2 -9 >> /dev/null
  urandom solo saca bloques si hay entropía.

Tuesta por exceso de syscalls
dd if=/dev/zero of=/dev/null


Ver stress.md
