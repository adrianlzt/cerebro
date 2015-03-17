https://www.redhat.com/archives/rhl-devel-list/2005-January/msg00447.html
http://cr.yp.to/syncookies.html

Según veo, si se spoofea la dirección source, el servidor no contesta al SYN.

Atacante     Server
      SYN -->
      <---- SYN+ACK
      <---- SYN+ACK
      <---- SYN+ACK

Por cada paquete SYN enviado por el atacante, el servidor genera /proc/sys/net/ipv4/tcp_syn_retries paquetes SYN+ACK.
Por defecto 5 paquetes que llevan en total 63s

A very popular denial of service attack involves a cracker sending many
(possibly forged) SYN packets to your server, but never completing the
TCP three way handshake. This quickly uses up slots in the kernel's half
open queue, preventing legitimate connections from succeeding. Since a
connection does not need to be completed, there need be no resources
used on the attacking machine, so this is easy to perform and maintain.

If the tcp_syncookies variable is set (only available if your kernel was
compiled with CONFIG_SYNCOOKIES) then the kernel handles TCP SYN packets
normally until the queue is full, at which point the SYN cookie
functionality kicks in.

SYN cookies work by not using a SYN queue at all. Instead the kernel
will reply to any SYN packet with a SYN|ACK as normal, but it will
present a specially-crafted TCP sequence number that encodes the source
and destination IP address and port number and the time the packet was
sent. An attacker performing the SYN flood would never have gotten this
packet at all if they're spoofing, so they wouldn't respond. A
legitimate connection attempt would send the third packet of the three
way handshake which includes this sequence number, and the server can
verify that it must be in response to a valid SYN cookie and allows the
connection, even though there is no corresponding entry in the SYN
queue.

Enabling SYN cookies is a very simple way to defeat SYN flood attacks
while using only a bit more CPU time for the cookie creation and
verification. Since the alternative is to reject all incoming
connections, enabling SYN cookies is an obvious choice.



# Pruebas

# sysctl -a | grep -e max_syn -e cook -e backlog
net.core.netdev_max_backlog = 1000
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 1

Intentando conectar el máximo de clientes, veo:
  3 ESTAB
  ~16 SYN-RECV

El número de SYN-RECV varía en ese número si mantenemos lo reintentos. Si lo dejamos estabilizarse se queda en unos 6/7



Aumento
sysctl -w net.ipv4.tcp_synack_retries=20
Para que el SO no termine ninguna SYN-RECV que le llegue.

El sistema va aceptando conexiones en la cola SYN-RECV hasta 7, más o menos. A partir de ahí, si el número crece, el sistema indiscriminadamente (parece) se dedica a ir eliminando conexiones de esa cola.
Da igual el tamaño de la cola syn (he llegado a poner net.ipv4.tcp_max_syn_backlog=100 y actua igual).
