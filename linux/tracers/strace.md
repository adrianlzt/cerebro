CUIDADO! ralentiza mucho las aplicaciones y puede matar aplicaciones que están en ejecucción
http://www.brendangregg.com/blog/2014-05-11/strace-wow-much-syscall.html

A partir del kernel 3.7 tenemos "perf trace", que hace la misma función sin el overhead de strace.
http://www.brendangregg.com/perf.html#More
perf trace -p PID

Mirar otros tracers que impacten menos.

http://www.hokstad.com/5-simple-ways-to-troubleshoot-using-strace

Nos sirve para ver que instrucciones ejecuta un binario.

strace -tt -fs 200 programa


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
  microseconds y formato unix epoch

strace -r
  timestamps relativos


Guardar a fichero
strace -o fichero

Nos unimos a un proceso que ya está corriendo, muestro lineas de 100 caracteres, tiemstamps, y guardo en ficheros cmon.strace.PID todos los hilos que se creen
strace -s 100 -t -o /home/alopez/cmon.strace -ff -p $(pidof cmon)

Mirar solo ciertas llamadas
strace -e trace=open,write ls
strace -e trace=network ...
  operaciones de red

strace -e file
  operaciones con ficheros
  podemos usar tambien opensnoop de bcc (linux/performance/bcc), que analiza todo el sistema en busca de llamadas a open()
  tambien puede filtrar por llamadas fallidas.

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

# Doc varia
http://chadfowler.com/blog/2014/01/26/the-magic-of-strace/
http://blog.endpoint.com/2013/06/debugging-obscure-postgres-problems.html
http://www.caktusgroup.com/blog/2013/10/30/using-strace-debug-stuck-celery-tasks/
https://www.iweb-hosting.co.uk/blog/diagnosing-magento-speed-issues-with-strace.html
https://blogs.oracle.com/ksplice/entry/strace_the_sysadmin_s_microscope
http://timetobleed.com/hello-world/
http://linuxgazette.net/148/saha.html
http://www.hokstad.com/5-simple-ways-to-troubleshoot-using-strace

# Internals
http://blog.packagecloud.io/eng/2016/02/29/how-does-strace-work/


# Errores
strace puede causar que un proceso se ponga en STOP https://bugzilla.redhat.com/show_bug.cgi?id=590172 http://lethargy.org/~jesus/writes/beware-of-strace
Si esto occure, matar strace y continuar el processo con: kill -CONT PID
