Ejemplo: unix_socket_server.c

Abrir sockets en non blocking:
http://stackoverflow.com/questions/1150635/unix-nonblocking-i-o-o-nonblock-vs-fionbio

Forma antigua, no estandarizada:
int opt = 1;
ioctl(fd, FIONBIO, &opt);
//FIONBIO=0x5421

sys/ioctl.h
#define FIONBIO   _IOW('f', 126, int) /* set/clear non-blocking i/o */

Si la cola backlog del socket está llena y usamos este ioctl(), el cliente retorna el error:
connect: Resource temporarily unavailable

http://stackoverflow.com/questions/7635440/error-on-accept-resource-temporarily-unavailable
El error realmente producido es: EAGAIN
Que significa: "I don't have answer for you right now and you have told me not to wait, so here I am returning without answer."





Forma POSIX:
#include <unistd.h>
#include <fcntl.h>
int flags = fcntl(fd, F_GETFL, 0);
fcntl(fd, F_SETFL, flags | O_NONBLOCK);

New programs should use fcntl(...O_NONBLOCK...), as standardized by POSIX.
