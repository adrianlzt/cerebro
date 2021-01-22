http://www.tldp.org/HOWTO/Adv-Routing-HOWTO/lartc.netfilter.html
https://manpages.debian.org/stretch/iptables/iptables-extensions.8.en.html#MARK

Nos puede servir para marcar paquetes y luego ponerles enrutados particulares.

Por ejemplo, enrutar todos los paquetes del puerto 25 por cierta interfaz.


https://unix.stackexchange.com/a/467164/145035
this mark exists only as long as it's handled by the Linux kernel. It's only purely virtual and internal, as it can have no existence on the wire


Ejemplo metiendo un mark en los paquetes tcp con destino puerto 11212. Nos vale para marcar un paquete antes de ser modificado por nat.PREROUTING y poder tomar una decisión basado en el puerto de destino origen:
iptables -t mangle -I PREROUTING 1 -p tcp --dport 11212 -j MARK --set-mark 0xFFBAABFF

Y haciendo match en filter.FORWARD, donde podríamos hacer un DROP:
iptables -t filter -I FORWARD 1 -m mark --mark 0xFFBAABFF -j LOG --log-prefix "adriFilFW: "

