cat /proc/sys/net/ipv4/ip_local_port_range

Nos dice el rango de puertos que podemos usar para establecer conexiones.

Número de puertos disponibles:
cat /proc/sys/net/ipv4/ip_local_port_range | awk '{printf "%d", $2-$1;}'

Cada conexión ocupa uno de estos puertos, pero tambien las conexiones en estado TIME_WAIT.
Si nos quedamos sin puertos, no podemos establecer más conexiones.

If TIME_WAIT is the problem, you can set net.ipv4.tcp_tw_reuse / net.ipv4.tcp_tw_recycle to speed up connection turnover.
