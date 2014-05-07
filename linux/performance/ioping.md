Mide latencia por dispositivo.
Nos muestra estadísticas similares a ping

yum install ioping

ioping -p 100 -c 200 -i 0 .

  -D usa direct IO para que no use cache ni readahead
  -R device  mide seek time (IO random)
  -RL device  mide seel time (IO secuancial)

1.- num of request
2.- serving time (usec)
3.- request per second (iops)
4.- trasnfer speed (bytes/sec)
5.- min req time (usec)
6.- avg req time (usec)
7.- max req time (usec)
8.- req time standar deviation (usec)
