Comparativa algoritmos de compresión
https://community.centminmod.com/threads/compression-comparison-benchmarks-zstd-vs-brotli-vs-pigz-vs-bzip2-vs-xz-etc.12764/


Best compression ratio goes to xz/pxz, followed by lzip/plzip and then the various bzip2 implementations. However, plzip2 was faster than pxz so if you want speed + compression ratio, plzip2 would of been better. But memory usage for plzip2 is much higher
Best compression speed goes to lbzip2 then Facebook's pzstd followed by pigz. At level 9 compression, lbzip2 = 103MB/s, zstd = 43MB/s, pzstd = 90MB/s and pigz = 72MB/s
Best decompression speed goes to Facebook's zstd/pzstd and by pigz. At level 9 compression, zstd = 578MB/s, pzstd = 273MB/s and pigz = 326MB/s
Multi-threaded compression tools used the most memory for compression with plzip using the most memory followed by pxz
Multi-threaded compression tools used the most memory for decompression with pzstd using the most memory followed by plzip

pigz: parallel gzip
pzstd: parallel zstd


# Zstd
Comprimir
zstd fichero
Nos crea fichero.zst, no borra el original.
Nos muestra como va realizando la compresión, para hacernos una idea de lo que va a tardar.
En mi pc, 52GiB convertidos en 9GiB tardó algo menos de 4 minutos.

Descomprimir
zstd -d fichero.zstd

Archivar: tar + zstd
tar --zstd -cf directory.tar.zst directory/

Comprimir todos los ficheros de un dir de forma recursiva, borrando los que se vayan comprimiendo.
Un poco más de espacio usado que un .tar (en una prueba hecha en una bd de postgres)
zstd -r --rm directory/

En principio pzstd debería comprimir un poco peor.

pzstd consume varios cores


# xz
Borra el fichero original y nos deja el .xz

xz -0 fichero
  el más rápido

xz -9 fichero
  el que más comprime

xz -9 -T 0 fichero
  usar todas las CPUs. O cambiar 0 por el número de CPUs que queramos usar.

unxz fichero.xz
