http://wiki.linux-nfs.org/wiki/index.php/Testing_tools
http://docs.oracle.com/cd/E19620-01/805-4448/6j47cnj0i/index.html

Parece que a NFS no le gusta manejar muchos ficheros pequeños:

352 directorios
6834 ficheros
36MB
flusheando caches antes de las copias (echo 3 > /proc/sys/vm/drop_caches)

Copia en FS local:
real    0m3.618s
user    0m0.040s
sys     0m0.998s


Copia en FS local, un único fichero tar:
real    0m0.071s
user    0m0.000s
sys     0m0.029s


Copia en NFS:
real    0m18.844s  <-------!!!!
user    0m0.060s
sys     0m1.294s


Copia en NFS, un único fichero tar:
real    0m0.169s
user    0m0.002s
sys     0m0.033s
