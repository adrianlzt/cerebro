Según cuenta el readme de rasdaemon, la información de los fallos se encuentra en el kernel

# rasdaemon
http://git.infradead.org/users/mchehab/rasdaemon.git/blob/HEAD:/README

Su objetivo a largo plazo es mostrar todos los errores de hardware, pero ahora mismo (05-2018) creo que solo saca de memoria.

Chequear si tenemos drives de EDAC (Error Detection and Correction)
ras-mc-ctl --status



# mcelog
deprecado en favor de rasdaemon
https://mcelog.org/
https://www.cyberciti.biz/tips/linux-server-predicting-hardware-failure.html

mcelog logs and accounts machine checks (in particular memory, IO, and CPU hardware errors) on modern x86 Linux systems.



# Testear inyectando errores
git://git.kernel.org/pub/scm/linux/kernel/git/gong.chen/mce-test.git
