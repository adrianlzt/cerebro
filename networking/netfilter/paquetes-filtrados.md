watch -d -n 1 "iptables -L -v  -n"

iptables -L -v -t nat -n

Muestra los paquetes que han pasado por el filtro.

-Z: muestra el número de paquetes y luego resetea el contador a 0
-n: no hace resolución inversa de dns

