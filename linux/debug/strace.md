(Tambien mirar perf.md)

http://www.hokstad.com/5-simple-ways-to-troubleshoot-using-strace

Nos sirve para ver que instrucciones ejecuta un binario.

strace programa


También podemos ver el estado de un binario que ya se está ejecutando:

strace -p PID


Si strace nos devuelve:
futex(0x104b824, FUTEX_WAIT_PRIVATE, 10, NULL

Quiere decir que es una aplicación multihilo. Deberemos conocer los pids de los hijos y hacer strace a ellos.
ps -efL | grep proceso


Para mostrar mensajes enteros:
strace -s 80 ...

Para mostrar tambien los hilos:
strace -f

Mostrar tiempo
strace -t

Guardar a fichero
strace -o fichero

Nos unimos a un proceso que ya está corriendo, muestro lineas de 100 caracteres, tiemstamps, y guardo en ficheros cmon.strace.PID todos los hilos que se creen
strace -s 100 -t -o /home/alopez/cmon.strace -ff -p $(pidof cmon)
