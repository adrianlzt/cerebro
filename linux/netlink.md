https://man7.org/linux/man-pages/man7/netlink.7.html
https://medium.com/@mdlayher/linux-netlink-and-go-part-1-netlink-4781aaeeaca8#.fttqra9os

netlink sockets are used to communicate with various kernel subsystems as an RPC system. man 7 netlink for more information.

Most kernel's process need communicate with user's process in Linux, but traditional Unix's IPC (pipe, message queue, shared memory and singal) can not offer a strong support for the communication between user's process and kernel. Linux provides a lot other methods which allow user's process can communicate with kernel, but they are very hard to use. To make these method easier to user for user, especially for Operational Engineer is the reason why we develop netlink.

libreria python para hablar netlink:
https://github.com/facebook/gnlpy

golang:
https://pkg.go.dev/github.com/mdlayher/netlink

https://github.com/elastic/gosigar/pull/151
  ejemplo de ps, sin obtener el pid

Para obtener info de los sockets de varios protocolos se usa: NETLINK_SOCK_DIAG
https://man7.org/linux/man-pages/man7/sock_diag.7.html


# Netlink
Creamos un socket de tipo AF_NETLINK.
También tendremo que pasar la familia (con quien nos queremos comunicar). Mirar man 7 netlink


Para el caso de taskstats se usará la familia NETLINK_GENERIC (https://www.kernel.org/doc/Documentation/accounting/taskstats.txt)


## Debug
https://lists.infradead.org/pipermail/libnl/2013-April/000993.html
https://web.archive.org/web/20160306082603/https://lists.infradead.org/pipermail/libnl/2013-April/000993.html

Si usamos "libnl" parece que podemos usar las variables:
NLDBG=9 o NLCB=DEBUG


Si no es el caso, podemos usar https://github.com/socketpair/nltrace
git clone https://github.com/socketpair/nltrace.git
cd nltrace
make

$ nltrace ss -t
$ LD_PRELOAD=./preload.so ss -t

Con go no parece funcionar.


## Add routes
https://olegkutkov.me/2019/08/29/modifying-linux-network-routes-using-netlink/

Es enviar un mensaje especial al socket de netlink.
Con strace se ve bastante bien la apertura del socket, mensaje enviado, etc.
Con sysdig no se ve el contenido y ciertos parámetros salen mal.

Con strace vemos (apertura del socket):
socket(AF_NETLINK, SOCK_RAW|SOCK_CLOEXEC, NETLINK_ROUTE) = 3

Con sysdig:
socket domain=16(AF_ROUTE) type=524291 proto=08

AF_ROUTE y AF_NETLINK es lo mismo, ambos "16"
https://github.com/torvalds/linux/blob/b5b65f1398274fd726eca87dbebd39f3e603348a/tools/perf/trace/beauty/include/linux/socket.h#L193

El mensaje para crear la nueva ruta (para distinguirlo podemos usar "nlmsg_type=RTM_NEWROUTE"):
sendmsg(3, {msg_name={sa_family=AF_NETLINK, nl_pid=0, nl_groups=00000000}, msg_namelen=12, msg_iov=[{iov_base=[{nlmsg_len=44, nlmsg_type=RTM_NEWROUTE, nlmsg_flags=NLM_F_REQUEST|NLM_F_ACK|NLM_F_EXCL|NLM_F_CREATE, nlmsg_seq=1632218764, nlmsg_pid=0}, {rtm_family=AF_INET, rtm_dst_len=32, rtm_src_len=0, rtm_tos=0, rtm_table=RT_TABLE_MAIN, rtm_protocol=RTPROT_BOOT, rtm_scope=RT_SCOPE_LINK, rtm_type=RTN_UNICAST, rtm_flags=0}, [[{nla_len=8, nla_type=RTA_DST}, inet_addr("1.2.3.4")], [{nla_len=8, nla_type=RTA_OIF}, if_nametoindex("wlo1")]]], iov_len=44}], msg_iovlen=1, msg_controllen=0, msg_flags=0}, 0) = 44
