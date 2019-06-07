mirar simple-client.c
simple-server.c

# Crear socket simple
man 2 socket
s = socket(AF_INET, SOCK_STREAM, 0)


Consultar el tamaño de la cola 'unacked' de un socket tcp: https://github.com/unbit/uwsgi/blob/2.0.9/core/master.c#L209
Para un socket LISTEN:
  ti.tcpi_unacked: tamaño ocupado de la cola backlog
  ti.tcpi_sacked: tamaño libre en la cola backlog

#include <netinet/tcp.h>

static void get_tcp_info(int fd) {
  ¦ ¦ ¦ struct tcp_info ti;
  ¦ ¦ ¦ socklen_t tis = sizeof(struct tcp_info);

  ¦ ¦ ¦ if (!getsockopt(fd, IPPROTO_TCP, TCP_INFO, &ti, &tis)) {
  ¦ ¦ ¦ ¦ ¦ ¦ ¦ printf("unacked: %u\n", ti.tcpi_unacked);
  ¦ ¦ ¦ ¦ ¦ ¦ ¦ printf("sacked: %u\n", ti.tcpi_sacked);
  ¦ ¦ ¦ }
}



# getsockopt
http://lxr.free-electrons.com/source/net/socket.c#L1904
SYSCALL_DEFINE5(getsockopt, int, fd, int, level, int, optname, char __user *, optval, int __user *, optlen)
struct socket *sock;
sock = sockfd_lookup_light(fd, &err, &fput_needed);
...
sock_getsockopt(sock, level, optname, optval, optlen);




# timeout

Definir un timeout de respuesta
https://stackoverflow.com/questions/2876024/linux-is-there-a-read-or-recv-from-socket-with-timeout
struct timeval tv;
tv.tv_sec = 30;  /* 30 Secs Timeout */
tv.tv_usec = 0;  // Not init'ing this can cause strange errors
setsockopt(sockfd, SOL_SOCKET, SO_RCVTIMEO, (const char*)&tv,sizeof(struct timeval));

Definir timeout de conex:
struct timeval tv;
tv.tv_sec = 3;  /* 30 Secs Timeout */
tv.tv_usec = 0;  // Not init'ing this can cause strange errors
setsockopt(sockfd, SOL_SOCKET, SO_SNDTIMEO, (const char*)&tv,sizeof(struct timeval));


Forma extraña vista en zabbix
https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/src/libs/zbxcomms/comms.c?at=refs%2Ftags%2F4.2.3#294
Antes de hacer el recv ponen una alarma, que cortará recv en caso de saltar.
No la recomiendan, por lenta, pero no explican mucho: https://stackoverflow.com/a/2878982
http://www.masterraghu.com/subjects/np/introduction/unix_network_programming_v1.3/ch14lev1sec2.html
Parece que en linux SO_RCVTIMEO/SO_SNDTIMEO se metió sobre el año 2000: http://lkml.iu.edu/hypermail/linux/kernel/0011.3/1001.html
Problemas con alarm: http://danzig.jct.ac.il/tcp-ip-lab/inet-dgram/timeout/
 1. exactly how signals are handled can differ between different types of UNIX. Also, not all system call functions might be interrupted by an alarm signal.
 2. If the program calls alarm in more than one place, the different calls might interfere with each other.

Razones para no usar SIGALRM
las alarmas y los programas multithread no se llevan muy bien
las alarmas suelen ir a nivel de proceso
el timeout es a nivel de socket
asi que en el momento en el que introduces cualquier hilo, las alarmas van a liarla bastante entre los hilos, mientras que el timeout no
los signal handlers de las señales tambien tienen una cantidad de llamadas bastante limitadas
