iozone.md
sysbench.md
bonnie.md
mongoperf.md
  test simple de escritura y lectura en disco


Disco SSD SATA3
Midiendo en la columna rMB/s y wMB/s velocidad con:
iostat  -d -x -t -m /dev/sda 1

Lectura, con: cat testfile1 >/dev/null
~250MB/s

Escritura, con: dd if=/dev/zero of=testfile2 bs=1G count=4 oflag=direct
~250MB/s





iostat

ioping

/proc/diskstats

iotop

/proc/io

pidstat

/sys/block/dev/stat

vmstat

sar



Bajo nivel:

seekwatcher

blktrace

blkiomon

btrace blkparse

btt

bno_plot

collectl

cifsiostat/nfsiostat

(faltan 2)
