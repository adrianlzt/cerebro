http://unixhelp.ed.ac.uk/CGI/man-cgi?proc+5
http://www.cs.fsu.edu/~baker/devices/lxr/http/source/linux/net/unix/af_unix.c?v=2.6.11.8


/proc/sys/net/unix
There are only two files in this subdirectory. They control the delays for deleting and destroying socket descriptors.

Tambien tienen una cola backlog establecida con la syscall listen()
La cola es del tamaño dicho en el parametro backlog+1

Caso con backlog=1 (cola tamaño 2)
El primer cliente se conecta con el socket y será procesado al llamar el programa a la syscall accept()
El segundo cliente se quedará en la cola backlog (no se ve con ss el tamaño de esta cola).
El tercer cliente se quedará en la cola backlog (no se ve con ss el tamaño de esta cola).
El cuarto cliente se queda en otra cola (RefCount en /proc/net/unix)
Si usamos sockets non-blocking este cuarto cliente será rechazado con EAGAIN:
  EAGAIN is often raised when performing non-blocking I/O. It means "there is no data available right now, try again later"


Servidor echo:
  programacion/c/unix_socket_server.c
  programacion/python/unix_socket_server.py


Estado de un socket:
http://fossies.org/linux/kernel/v2.6/longterm/v2.6.32/linux-2.6.32.63.tar.gz/linux-2.6.32.63/net/unix/af_unix.c

Num  is  the kernel table slot number
RefCount is the number of users of the socket
Protocol is currently always 0
Flags  represent  the internal kernel flags holding the status of the socket. 
  #define __SO_ACCEPTCON  (1<<16)
  s->state == TCP_LISTEN ? __SO_ACCEPTCON : 
St is the internal state of the socket and Path is the bound path (if any) of the socket.
  SS_CONNECTED, SS_UNCONNECTED, SS_CONNECTING, SS_DISCONNECTING


Estado de los sockets:
netstat -ap
  Un socket escuchando:
    unix  2      [ ACC ]     STREAM     LISTENING     1202650 30625/./echo        echo_socket
  Un cliente conectado:
    unix  3      [ ]         STREAM     CONNECTED     1215675 30625/./echo        echo_socket
  Un cliente esperando en, backlog?:
    unix  3      [ ]         STREAM     CONNECTING    0      -                   echo_socket
  Un cliente fuera de, backlog?:
    unix  5      [ ACC ]     STREAM     LISTENING     1202650 30625/./echo        echo_socket
          ^ este numero indica el número de clientes en espera quitando 2 (en este casi habría tres esperando)
  
ss -a -f unix
  parece que hay un bug que hace que no se muestre la cola: http://www.spinics.net/lists/netdev/msg227274.html
  en la versión iproute-2.6.32-32.el6_5.x86_64 falla
  Un socket escuchando:
    u_str  LISTEN     0      0          echo_socket 1202650               * 0
  Un cliente conectado:
    u_str  ESTAB      0      0          echo_socket 1215675               * 0
  Un cliente esperando en, backlog?:
    u_str  SYN-SENT   0      0          echo_socket 0                     * 0
  Un cliente fuera de, backlog?:
    No se muestra por el bug

Podemos ver el tamaño de la cola con:
ss -x state SYN-SENT | grep nombre-socket | wc -l
  contamos el numero de conexiones en estado syn-sent para el socket que coja grep

Con un check de nagios:
/usr/lib64/nagios/plugins/check_generic.pl -n "backlog_queue" -e "MAX=$(cat /proc/sys/net/core/somaxconn); CPUNUM=$(cat /proc/cpuinfo | grep processor | wc -l); NUM=$(/usr/sbin/ss -x state SYN-SENT | grep cyclops-alarmer | wc -l); awk \"BEGIN {print 100*\$NUM/\$MAX/\$CPUNUM/2 }\"" -w '>50' -c '>80'

Estamos convirtiendo el valor a un porcentaje respecto a somaxconn*num_cpus*2 (que es el numero de file sockets abiertos)



http://www.toptip.ca/2013/02/overflow-in-datagram-type-sockets.html
/proc/sys/net/unix/max_dgram_qlen
/proc/sys/net/core/rmem_max
/proc/sys/net/core/wmem_max



# Sockets options
http://pubs.opengroup.org/onlinepubs/9699919799/functions/V2_chap02.html
Apartado: 2.10.16 Use of Options

Buffer recv: SO_RCVBUF

## Query
syscall
int getsockopt(int socket, int level, int option_name, void *restrict option_value, socklen_t *restrict option_len);

## Set
syscall
int setsockopt(int socket, int level, int option_name, const void *option_value, socklen_t option_len);



sockets
se quedan parados tras hacer send() ?
lo llegan a ejecutar?
no veo forma de saber el tamaño de la cola backlog de un unix socket



# Cliente de un unix socket
https://serverfault.com/questions/252723/how-to-find-other-end-of-unix-socket-connection
Parece que en Linux no se puede saber quien es el cliente de un unix socket.


# Sniff socket
https://github.com/mechpen/sockdump
Usando eBPF/BCC
