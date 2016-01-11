(Tambien mirar perf.md)

http://www.hokstad.com/5-simple-ways-to-troubleshoot-using-strace

Nos sirve para ver que instrucciones ejecuta un binario.

strace -fs 200 programa


También podemos ver el estado de un binario que ya se está ejecutando:

strace -p PID


Si strace nos devuelve:
futex(0x104b824, FUTEX_WAIT_PRIVATE, 10, NULL

Quiere decir que es una aplicación multihilo. Deberemos conocer los pids de los hijos y hacer strace a ellos. O usar -f
ps -efL | grep proceso


Para mostrar mensajes enteros:
strace -s 80 ...

Para mostrar tambien los hilos:
strace -f

# Tiempo
strace -t
strace -tt
  microseconds
strace -ttt
  microseconds y epoch (creo)

strace -r
  timestamps relativos


Guardar a fichero
strace -o fichero

Nos unimos a un proceso que ya está corriendo, muestro lineas de 100 caracteres, tiemstamps, y guardo en ficheros cmon.strace.PID todos los hilos que se creen
strace -s 100 -t -o /home/alopez/cmon.strace -ff -p $(pidof cmon)

Mirar solo ciertas llamadas
strace -e trace=open,write ls
strace -e trace=network ...

strace -e file
  operaciones con ficheros

Tambien: process, network, signal, ipc, desc (file descriptor), memory


Para hacer recuento de las llamadas y nos dice el tiempo que ha llevado cada una
strace -c

Recuento más funcionamiento normal
strace -C


Versión gráfica parecida: sysprof



# Conexiones
strace -e poll,select,connect,recvfrom,sendto nc www.news.com 80

Punto 5) de
http://www.hokstad.com/5-simple-ways-to-troubleshoot-using-strace


