time es un built-in de bash

Mejor usar el comando GNU:
/usr/bin/time -v CMD

  -v: toda la info disponible

/usr/bin/time -ao metrica -f "pwd: %e" pwd
  -a append
  -o escribe el fichero metrica
  -f "pwd: %e" formato de la cadena output


# Arch
pacman -S time


user = tms_utime + tms_cutime
sys = tms_stime + tms_cstime
The  tms_utime  field contains the CPU time spent executing instructions of the calling process.  The tms_stime field contains the CPU time spent in the system while executing tasks on behalf of the calling process.  The tms_cutime field contains the sum  of  the  tms_utime  and tms_cutime values for all waited-for terminated children.  The tms_cstime field contains the sum of the tms_stime and tms_cstime values for all waited-for terminated children.


El tiempo de iowait no se computa en el campo system
$ sudo time taskset -c 3 dd if=/dev/sda of=/dev/null bs=1M
0.01 user
2.05 system
0:08.64 elapsed
23%CPU



# I/O Wait
http://veithen.github.io/2013/11/18/iowait-linux.html

For a given CPU, the I/O wait time is the time during which that CPU was idle (i.e. didn’t execute any tasks) and there was at least one outstanding disk I/O operation requested by a task scheduled on that CPU (at the time it generated that I/O request).

sudo taskset -c 3 dd if=/dev/sda of=/dev/null bs=1M
Mirar con top (cambiar con t la vista de cpu)
