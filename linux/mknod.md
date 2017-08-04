http://www.makelinux.net/ldd3/chp-3-sect-2
http://wiki.linuxquestions.org/wiki/Mknod#Examples


Los Major y Minor numbers son punteros al driver que usa el kernel para el dispositivo.
Estos números los podemos ver si hacemos un "ls -l /dev"

La primera letra (c o b) especificará si es un device de chars o de bloques.


mknod sirve para crear estos ficheros especiales de bloques o caracteres y asociarlos a un driver (major-minor) específico.


makedev, major, minor - manage a device number


En /proc/devices podemos ver la relación entre major number y driver
