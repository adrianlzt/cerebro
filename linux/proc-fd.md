Si un programa que tenia abierto un fichero, se borra ese fichero, aun podemos recuperar el contenido copiando el file descriptor que estaba usando ese proceso.
cp /proc/<PID>/fd/n /tmp/fichero

Si el file descriptor es un socket, el numero entre corchetes es el inodo


Si queremos truncar un fichero borrado pero mantenido abierto por un proceso que se encuentra actualmente en ejecución:
> /proc/PID/fd/elquesea


Podemos cerrar un FD de un PID que esté corriendo:
gdb -p PID
gdb> p close(FD)

Lo probé con un programa y se cerro de golpe



Si queremos leer el stdout del programa:
cat /proc/PID/fd/1
Se mantendrá el cat abierto mostrándonos la salida estandar.

Parece que también puedo ver el stdin con
cat /proc/PID/fd/0
Pero haciendo pruebas con un script en bash no me coge todo
