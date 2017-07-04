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
