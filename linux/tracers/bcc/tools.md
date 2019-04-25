Mirar bcc_tracing_tools_2016.png para ver que herramienta necesitamos para cada parte que queramos analizar
https://github.com/iovisor/bcc/tree/master/tools


# Latencias / disco / ficheros

Para disco mirar las vfs, ext4, btrfz, xfs...
Análsis de disco lento:
fileslower btrfsslower ext4slower xfsslower zfsslower
Nos sirve para saber si un problema de latencia tiene como responsable al disco.
Si el disco está contestando, por ejemplo, en menos de 1ms, probablemente el problema esté en otro lado.

Ejemplo:
ext4slower 1
  nos devuelve los comandos que están ejecutando file system I/O y tardando más de 1ms



## biosnoop
Nos da las latencias que están teniendo los distintos programas para leer o escribir en disco.
Va mostrando líneas nuevas con cada acceso y nos muestra la latencia.


## biolatency
Recolecta datos hasta que presionemos Control+c
Luego nos muestra un histograma con la distribución de latencias (que cantidad de paquetes hay en cada rango de latencias)
Podemos hacer que nos vaya sacando histogramas cada X segundos durante N veces

biolatency -mT 1 5
  cada segundo, durante 5 veces, muestra las latencias de disco en milisegundos (-T mostrar timestamp)
  saber intepretar cuando son respuestas de cache y cuando no


# execsnoop
Nos muestra los procesos que se ejecutan, con sus argumentos y return value
short-lived-processes


# filelife
Muestra short-lived files, que se han creado y borrado mientras la ejecucción de la app
Lo que hace es capturar llamadas a stat()


# filetop
shows reads and writes by file, with process details


# memleak
Podemos investigar si un proceso esta solicitando memoria y no la libera (memory leaks)
memleak -p 10 60 1
  para el pid=10, saca una vez, pasados 60", los stacktraces de memoria requerida que no fueron liberados
  nos puede servir para investigar porque la app esta cogiendo memoria y no liberándola


# offcputime
Nos dice el tiempo que un proceso estuvo fuera de CPU esperando algo (un page fault por ejemplo).
Nos muestra el proceso originador (abajo del todo) y el stack que fue llamando (hacia arriba).
El resultado está en microsegundos

Mirar tambien offwaketime y wakeuptimeo


# oomkill
Imprime una linea por cada vez que se lanze el oom killer:
21:03:39 Triggered by PID 3297 ("ntpd"), OOM kill of PID 22516 ("perl"), 3850642 pages, loadavg: 0.99 0.39 0.30 3/282 22724


# opensnoop
Tracea llamadas a open()

Con la opción -x solo muestra intentos de apertura fallidos.


# statsnoop
Llamadas stat() por proceso


# runqlat
Histograma con las latencias que sufren los procesos para pasar a la cpu


# bashreadline
Mirar que comandos se están ejecutando con bash


# Análisis syscalls / funciones
más ejemplos: https://github.com/iovisor/bcc/tree/master/examples/tracing

## trace
https://github.com/iovisor/bcc/blob/master/tools/trace_example.txt
mirar events_and_arguments.md para ver porque podemos filtrar
mirar capturar_llamadas_programa.md
mirar los ejemplos en la ayuda del comando

Analizamos llamadas al sistema

Por defecto, entry probe, kernel function.
Las syscall se llaman sys_X. Ejemplo, para connect -> sys_connect

p -> kprobe
r -> kretprobe
t -> tracepoint
u -> usdt

En los argumentos, si no ponemos nada -> syscall
 r::nombre, return value de una syscall
 c:open, open() de libc
 p:c:write write() de libc
 r:c:malloc, return de malloc() de libc
 t:block_block_rq_complete kernel tracepoint
 u:pthread:pthread_create, usdt probe

 'func' means 'p::func'
 'lib:func' means 'p:lib:func'

 Si no definimos lib, quiere decir que es el kernel

 Everything until the first space is the probe specifier
 Si tenemos parentesis sera un filtro
 El resto sera para printf

 Variables que podemos usar en el print: https://github.com/iovisor/bcc/blob/master/tools/trace.py#L205
 arg[1-6], $uid, $gid, $pid, $tgid, $cpu, retval
 Tambien podemos ponerlo sin el alias:
 PT_REGS_PARM2(ctx), (unsigned)(bpf_get_current_uid_gid() & 0xffffffff), etc


Mostrar todas las llamadas a sys_execve (arrancar un programa), y mostramos su primer argumento (el programa que arrancamos)
trace 'sys_execve "%s", arg1'

Mostrar que ficheros abre un proceso:
trace -p 2740 'do_sys_open "%s", arg2'

Comandos que están leyendo de disco mas de 20k , mostrar PID y file descriptor:
trace 'sys_read (arg3 > 20000) "read %d bytes from fd %d", arg3, arg1'

Mostrar señales kill (quitadas las signal=0, que son pruebas):
./trace 'SyS_kill ((int)arg2 != 0) "pid:%d signal:%d", arg1, arg2'
Nos devuelve el proceso que la ha lanzado, contra que pid y que señal.
Mejor usar killsnoop

Quien ejecuta un rmdir y contra que dir:
./trace 'do_rmdir "dir:%s", arg2'

trace 'r:/home/adrian/Documentos/http2/nghttp2/examples/.libs/lt-client:send_callback "data:%d", retval'

./trace 'r:/home/adrian/Documentos/http2/nghttp2/examples/.libs/lt-client:send_callback "%d data:%d len:%d flags:%d user_data:%x ret:%d, UID:%d", PT_REGS_PARM2(ctx), arg2, arg3, arg4, arg5, retval, (unsigned)(bpf_get_current_uid_gid() & 0xffffffff)'

No poner args al tuntun porque no funciona bien. Poner solo el arg que queremos analizar.
He visto que poniendo solo arg2 para SSL_WRITE se veia bien, pero si intentaba poner arg1, arg2, arg3 y arg4 no se veia.

Analizar trafico ssl que use openssl:
./trace -Z 200 'p:/usr/lib/libssl.so.1.0.0:SSL_write "%s", arg2'
./trace -Z 200 'p:/usr/lib/libssl.so.1.0.0:SSL_read "%s", arg2'



## stackcount / stacksnoop
Para una syscall/función determinada, nos saca los stacks que están produciendo esa llamada.
La variante hace como un count -c


## argdist
https://github.com/iovisor/bcc/blob/master/tools/argdist_example.txt

Análisis de los parámetros con que se llaman a funciones.
Podemos sacar histogramas con, por ejemplo, el tamaño de buffer al salir por stdout.

Otro ejemplo, buscar que cadenas se estan imprimiendo (puts)
./argdist -i 10 -n 1 -C 'p:c:puts(char *str):char*:str'

syscalls read por proceso
argdist -C 'p:c:write():int:$PID;write per process' -n 2



# Red / network
más ejemplos: https://github.com/iovisor/bcc/tree/master/examples/networking

## tcpconnect / tcpconnlat
Nos muestra las conexiones que esta realizando cada programa.
También permite filtrar por pid

También con versión con latencia (tiempo entre envio del paquete SYN hasta la respuesta)
La versión con latencia solo muestra conexiones establecidas.

Mirando los dos comandos podríamos encontrar conexiónes que no se establecen.
Estaría bien una tool para esto (intentos de conexión no conseguidos)

## tcpaccept
Muestra conexiones entrantes (cuando se produce la syscall accept())

## tcpretrans
Si tenemos problemas en la red seguramente se estén retransmitiendo paquetes.

## tcptop
un top de las conexiones que se están estableciendo.
Con -C no borramos la pantalla.
Si son short lived procs tal vez no capture el nombre del comando.

## tcptrace
Listado de conexiones establecidas (C), aceptadas (A) o cerradas (X)
Nos dice el comando, IP origen/destino y puerto origen/destino

# gethostlatency
Captura las llamadas de resolución de nombres y nos devuelve por quien se ha preguntando, que programa y la latencia de la respuesta.
