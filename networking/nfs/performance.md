http://nfs.sourceforge.net/#section_b
http://wiki.linux-nfs.org/wiki/index.php/Testing_tools
http://docs.oracle.com/cd/E19620-01/805-4448/6j47cnj0i/index.html

Parece que a NFS no le gusta manejar muchos ficheros pequeños.
Siempre que podamos usar hardlinks, mv en vez de cp -r, rsync, etc.

Para borrar más rapido:
$ time rm -fr smallfiles4
real    2m9.935s
user    0m0.591s
sys     0m15.097s
$ mkdir empty
$ time rsync -a --delete empty/ smallfiles2/
real    1m45.804s
user    0m1.133s
sys     0m12.402s

Mejor aun con find y xargs. Depdiendo también de la estructura de directorios:
find target_directory -maxdepth 3 | tac | xargs -P 5 -n 5 rm -rf
Enviamos muchas peticiones en paralelo al server NFS

Parece que borrar un directorio que es todo el hard links es bastanta rápido tambien.


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



# Herramientas
nfsiostat.md
mountstats.md
iozone.md <- para pruebas de carga

# Datos interesantes
http://www.admin-magazine.com/HPC/Articles/Monitoring-NFS-Storage-with-nfsiostat

Velocidad de las operaciones read y write
Velocidad de las operaciones read y write con O_DIRECT (sin caches)
Velocidad de las operaciones NFS READ y NFS WRITE
Operaciones/s
Read ops/s
Write ops/s



http://serverfault.com/questions/20037/tuning-nfs-for-minimum-latency
It's worth pointing out that on modern linux, it's probably better to not specify any options as it'll do a better job at using the best values than you will. – David Pashley Jun 5 '09 at 8:18



# Valores de referencia
Una buena cabina:
read bw: 86MS/s
write bw: 3.3MB/s
ops/s: 3k
read ops/s: 300
write ops/s: 350

copia de un dir con 4325 ficheros y tamaño total 31MB:
real    0m8.397s
user    0m0.049s
sys     0m0.751s

Generar fichero de 100MB con dd:
104857600 bytes (105 MB) copied, 0.291707 s, 359 MB/s

real    0m0.296s
user    0m0.002s
sys     0m0.140s





Una ¿mala? cabina (limita la vm cliente?):
read bw: 38MB/s
write bw: 400KB/s
ops/s: 600
read ops/s: 60
write ops/s: 60

copia de un dir con 4325 ficheros y tamaño total 31MB: 
real    0m34.686s
user    0m0.168s
sys     0m3.540s

Generar fichero de 100MB con dd:
104857600 bytes (105 MB) copied, 10.5396 s, 9.9 MB/s

real    0m10.559s
user    0m0.000s
sys     0m0.278s





Una vm en ost como server nfs (limita la vm cliente?):
read bw: 47.7MB/s
write bw: 450KB/s
ops/s: 400
read ops/s: 50
write ops/s: 40

copia de un dir con 4325 ficheros y tamaño total 31MB: 
real    1m2.047s
user    0m0.143s
sys     0m3.003s

Generar fichero de 100MB con dd:
104857600 bytes (105 MB) copied, 5.1515 s, 20.4 MB/s

real    0m5.170s
user    0m0.004s
sys     0m0.300s

