http://vincent.bernat.im/en/blog/2014-tcp-time-wait-state-linux.html
Análsis conciencudo del problema del TIME_WAIT

http://inedit00.blogspot.com.es/2012/02/hoy-vamos-explicar-un-poco-que-es.html

http://tools.ietf.org/html/rfc793
http://tools.ietf.org/html/rfc1323

TIME-WAIT - represents waiting for enough time to pass to be sure the remote TCP received the acknowledgment of its connection termination request.
Solo se produce en el extremo que está cerrando la conexión.

Dicho por un tipo de telefonica en el curso de tunning:
  El TIME_WAIT se produce por un cierre incorrecto de la conexión 
    Podría ser culpa del cliente que ha enviado el cierre del "canuto" de envío, y el de recepción lo ha cerrado a capón.
    Podría ser culpa del firewall con conex en keep alive, que el KA sea mayor que el tiempo que el FW mantiene abierta la conex.


TIME_WAIT ----esperar 2xMSL---> CLOSED

En realidad el tiempo está fijado "a fuego" en el kernel a 60". Leer más abajo.


MSL = Maximum Segment Lifetime
cat /proc/sys/net/ipv4/tcp_fin_timeout

60" en ubuntu y centos
30" en debian
120" en solaris


If TIME_WAIT is the problem, you can set net.ipv4.tcp_tw_reuse / net.ipv4.tcp_tw_recycle to speed up connection turnover.
The other solution is to use tcp_tw_recycle and tcp_tw_reuse. Both options are very dangeorus and are violates the RFC 1122[1].  They are not recommended in a production enviroment. http://www.krenel.org/tcp-time_wait-and-ephemeral-ports-bad-friends/
NO HACER, problemas con clientes NAT: http://vincent.bernat.im/en/blog/2014-tcp-time-wait-state-linux.html

Mirar tambien puertos_efiremos.md


No se puede cambiar el valor en los kernel nuevos:
Ok. But is necessary to wait 2*MSL seconds before closing a connection? Can I reduce the time? Well, int theory yes but if you are under under a Linux kernel (I have 3.2.0-3 now) you can’t. The question is: WHY?! Well, it’s something funny, guys. The value MSL=60 is, well, hardcoded in the Linux kernel. 

https://git.kernel.org/cgit/linux/kernel/git/torvalds/linux.git/tree/include/net/tcp.h
línea 114
#define TCP_TIMEWAIT_LEN (60*HZ) /* how long to wait to destroy TIME-WAIT
				  * state, about 60 seconds	*/

El commit nos lleva a un commit general de una importación inicial de código. Sin pistas. Pero el commit es de 2005, así que el problema tiene que estar en otro lado.
