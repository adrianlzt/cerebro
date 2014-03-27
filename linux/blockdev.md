http://ashok-linux-tips.blogspot.com.es/2012/08/improving-read-performance-of-disks.html

To change the 'Read-Ahead' value to 8 MB (16384 times of 512 bytes blocks).
# blockdev --setra 16384 /dev/sda

Lo que hacemos es que cuando se lea un bloque del disco se lean los siguientes 8MB en vez de los 128kB por defecto.

Para ver el ReadAhead que tenemos:
blockdev --report
