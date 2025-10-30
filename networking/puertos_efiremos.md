cat /proc/sys/net/ipv4/ip_local_port_range

Nos dice el rango de puertos que podemos usar para establecer conexiones.

Número de puertos disponibles:

```bash
cat /proc/sys/net/ipv4/ip_local_port_range | awk '{printf "%d", $2-$1;}'
```

Parece que suele ser 28k

Cada conexión ocupa uno de estos puertos, pero tambien las conexiones en estado TIME_WAIT.
Si nos quedamos sin puertos, no podemos establecer más conexiones.

If TIME_WAIT is the problem, you can set net.ipv4.tcp_tw_reuse / net.ipv4.tcp_tw_recycle to speed up connection turnover.
Do not enable net.ipv4.tcp_tw_recycle—it doesn’t even exist anymore since Linux 4.12
<https://vincent.bernat.ch/en/blog/2014-tcp-time-wait-state-linux>
