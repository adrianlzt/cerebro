Bufer muy pequeño se descartarán paquetes.
Buffer muy grande produce latencia, porque hasta que el buffer no se llena no se envía al kernel (efecto 'buffer load')


net.ipv4.tcp_moderate_rcvbuf=1
Autotuning del bufer de recepcion.

net.core.rmem_max = 33554432
Bufer de recepcion (incrementar hasta el BDP)

net.core.wmem_max = 33554432
Bufer de envío (incrementar hasta el BDP)

net.ipv4.tcp_rmem = 4096 87380 33554432
Valor mínimo, inicial y máximo del buffer de recepcion TCP

net.ipv4.tcp_wmem = 4096 65536 33554432
Valor mínimo, inicial y máximo del buffer de envío TCP

sysctl net.ipv4.tcp_window_scaling=1
Activar escalado de ventana (para superar limite de 2^16 bytes = 65Kb).
Se usa una zona de tcp para usar unos bits libres para multiplicar el tamaño de la ventana.
No es común tocarlo

sysctl net.ipv4.tcp_timestamps=1
Usar timestamps para calcular RTT, no el RTO. Activar salvo en redes de muy baja velocidad (p.e. 56kbps).

sysctl net.ipv4.tcp_sack=1
Activa SACK (envío selectivo de paquetes perdidos), especialmente en redes con muchas pérdidas (wireless, etc).
Lo desactivamos para no esperar a los ack.

net.ipv4.tcp_fin_timeout=10
Es el tiempo de espera del TIME_WAIT para liberar una conexión cerrada (si se reduce se liberan mejor los recursos, pero disminuye probabilidad de reabrir la conexión, que es menos costoso que establecer una nueva).
Bug en RHEL no permite modificarlo (hardcodeado en código)
Mirar time_wait.md

net.ipv4.tcp_tw_recycle=1
Habilita reciclado rápido de sockets en TIME_WAIT (problemático con balanceadores).

echo 1 > /proc/sys/net/ipv4/tcp_tw_reuse=1
Habilita reuso de sockets en TIME_WAIT (muy eficiente con balanceadores y entornos con muchas conexiones cortas)

net.ipv4.ip_local_port_range="32768     61000"
Rango de ephemeral ports (incrementar)

net.ipv4.tcp_keepalive_intvl
Tiempo entre keepalives.
No hay receta universal, probar

net.ipv4.tcp_keepalive_probes
nº de keepalives antes de cerrar la conexión.
No hay receta universal, probar

net.ipv4.tcp_no_metrics_save = 1
Not to cache ssthresh from previous connection.
Si la red no ha funcionado bien, estaremos usando una ventana inusualmente pequeña. Este parámetro evita cachear el valor de la ventana.

sysctl net.ipv4.tcp_available_congestion_control
westwood recomendado para redes lossy (wifi por ejemplo). Para redes normales, cubic o hamilton.

net.ipv4.tcp_max_syn_backlog=16384
Maximum number of remembered connection requests, which still have not received an acknowledgment from connecting clients.

net.ipv4.tcp_synack_retries=1
The parameter on line 2 determines the number of SYN+ACK packets sent before the kernel gives up on the connection.  To open the other side of the connection, the kernel sends a SYN with a piggybacked ACK on it, to acknowledge the earlier received SYN. This is part 2 of the three-way handshake

net.ipv4.tcp_max_orphans=400000
Maximum number of TCP sockets not attached to any user file handle, held by system. If this number is exceeded orphaned connections are reset immediately and warning is printed.  This limit exists only to prevent simple DoS attacks, you _must_ not rely on this or lower the limit artificially, but rather increase it (probably, after increasing installed memory), if network conditions require more than default value, and tune network services to linger and kill such states more aggressively. 

net.ipv4.route.flush=1
En Linux 2.4.x el ssthresh se cachea durante 10 minutos (si una conexión tuvo congestión afecta a las siguientes). Poner "1" para desactivar.

net.ipv4.conf.all.rp_filter=0
Desactivar Reverse Path Filter (protección de spoofing de paquetes entrantes, no se comprueba si la dirección de origen es posible).
Recomendable en los hosts de máquinas virtuales.
A veces sucede en máquinas con varias interfaces, que le llega un paquete por una interface y contesta por otra

net.ipv4.tcp_autocorking
kernel 3.14+ http://lwn.net/Articles/576263/ http://www.phoronix.com/scan.php?page=news_item&px=MTU4Mjk
Agrupa paquetes antes de enviarlos (empeora latencia, disminuye congestión)
Algoritmo de Nagle, agrupa paquetes pequeños, esto va por defecto.
Este parámetro (autocorking) lo que hace es aumentar este efecto.

