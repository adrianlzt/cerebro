Si un programa que tenia abierto un fichero, se borra ese fichero, aun podemos recuperar el contenido copiando el file descriptor que estaba usando ese proceso.
cp /proc/<PID>/fd/n /tmp/fichero

Si el file descriptor es un socket, el numero entre corchetes es el inodo


Si queremos truncar un fichero borrado pero mantenido abierto por un proceso que se encuentra actualmente en ejecución:
> /proc/PID/fd/elquesea


Podemos cerrar un FD de un PID que esté corriendo:
gdb -p PID
gdb> p close(FD)

Lo probé con un programa y se cerro de golpe


Si queremos cerrar un FD abierto por nuestra shell (para cerrar el 3):
exec 3<&-



Si queremos leer el stdout del programa:
cat /proc/PID/fd/1
Se mantendrá el cat abierto mostrándonos la salida estandar.
Funciona si es una redirección a un fichero. Si es a una tty no funcionará.
https://unix.stackexchange.com/a/275826
Podemos usar strace -e write, pero es un poco bestia.
O sysdig.

Parece que también puedo ver el stdin con
cat /proc/PID/fd/0
Pero haciendo pruebas con un script en bash no me coge todo
