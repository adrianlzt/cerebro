Mirar hardware/disco.md

Kernel tiene readahead (además del readahead del dispositivo):
Leer el parámetro:
  blockdev --getra /dev/sda
  cat /sys/block/sda/queue/read_ahead_kb
Modificar el parámetro
  blockdev --setra 512 /dev/sda
  echo "512" > /sys/block/sda/queue/read_ahead_kb

El readahead tiene como contrapartida que cada lectura tarda más.

Queue length:
cat /sys/block/sda/queue/nr_requests
Tamaño de la cola de peticiones a disco.
Un valor alto puede ser bueno porque ordena las peticiones y junta las peticiones más próximas en disco.
La desventaja es que la latencia es mayor.


https://www.kernel.org/doc/Documentation/block/stat.txt
/sys/block/<dev>/stat
Estadísticas sobre lecturas, escrituras, tiempos, etc


Info del fabricante:
cat /sys/block/sdb/device/{vendor,model}

# USE
Disk IO:
http://blog.scoutapp.com/articles/2011/02/10/understanding-disk-i-o-when-should-you-be-worried
http://www.cmdln.org/2010/04/22/analyzing-io-performance-in-linux/


pidstat -d 1

biolatency (BPF)
  histograma de la latencia en IO de los procesos


Mirar escrituras y lecturas a los discos
vmstat -d
vmstat -p /dev/sda1  (se puede restringir a una sola partición)

Resumen sobre la escritura a disco
vmstat -D

Hay más comandos



# Para conocer los nombres de los discos cuando son tipo dev...
lsblk
/proc/diskstats


# Nombres uuid
sudo blkid
