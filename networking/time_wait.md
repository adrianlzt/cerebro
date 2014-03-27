http://inedit00.blogspot.com.es/2012/02/hoy-vamos-explicar-un-poco-que-es.html

TIME_WAIT ----esperar 2xMSL---> CLOSED

En realidad el tiempo está fijado "a fuego" en el kernel a 60". Leer más abajo.


MSL = Maximum Segment Lifetime
cat /proc/sys/net/ipv4/tcp_fin_timeout

60" en ubuntu y centos
30" en debian
120" en solaris


If TIME_WAIT is the problem, you can set net.ipv4.tcp_tw_reuse / net.ipv4.tcp_tw_recycle to speed up connection turnover.
The other solution is to use tcp_tw_recycle and tcp_tw_reuse. Both options are very dangeorus and are violates the RFC 1122[1].  They are not recommended in a production enviroment. http://www.krenel.org/tcp-time_wait-and-ephemeral-ports-bad-friends/

Mirar tambien puertos_efiremos.md


No se puede cambiar el valor en los kernel nuevos:
Ok. But is necessary to wait 2*MSL seconds before closing a connection? Can I reduce the time? Well, int theory yes but if you are under under a Linux kernel (I have 3.2.0-3 now) you can’t. The question is: WHY?! Well, it’s something funny, guys. The value MSL=60 is, well, hardcoded in the Linux kernel. 

https://git.kernel.org/cgit/linux/kernel/git/torvalds/linux.git/tree/include/net/tcp.h
línea 114
#define TCP_TIMEWAIT_LEN (60*HZ) /* how long to wait to destroy TIME-WAIT
				  * state, about 60 seconds	*/
