http://man7.org/linux/man-pages/man5/proc.5.html
https://www.kernel.org/doc/Documentation/filesystems/proc.txt


## /proc/diskstats

Distingue por particiones

El match entre las entradas de diskstats y las particiones (en caso de tener LVM) se pueden saber con el comando: lsblk
Significado de cada valor:
Field 1 -- # of reads issued (lecturas completadas)
Field 2 -- # of reads merged, field 6 -- # of writes merged
Field 3 -- # of sectors read
Field 4 -- # of milliseconds spent reading
Field 5 -- # of writes completed
Field 6 -- # of writes merged
Field 7 -- # of sectors written
Field 8 -- # of milliseconds spent writing
Field 9 -- # of I/Os currently in progress
Field 10 -- # of milliseconds spent doing I/Os
Field 11 -- weighted # of milliseconds spent doing I/Os 
