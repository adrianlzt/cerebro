http://word.bitly.com/post/74839060954/ten-things-to-monitor
https://gist.githubusercontent.com/jehiah/8511258/raw/check_forkrate.sh

Normally you would only expect a fork rate of 1-10/sec on a production box with steady traffic.

Poner, por ejemplo:
-w 6 -c 12
Va guardando en un fichero, y divide la diferencia en el numero de procesos entre los segudos que han pasado.
