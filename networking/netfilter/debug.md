http://backreference.org/2010/06/11/iptables-debugging/

Cargar el modulo que nos permite logear las conexiones de iptables:
# modprobe ipt_LOG

Solo para la tabla nat

Sacar trazas de los paquetes ICMP:
iptables -t raw -A PREROUTING -p icmp -j TRACE
iptables -t raw -A OUTPUT -p icmp -j TRACE


Parece que también saca más trazas de otras tablas por donde pasa el paquete.

El problema es como hacer con las reglas que ya tienen un -j algo, para que tambien hagan trace.


Mirar las trazas
journalctl -f _TRANSPORT=kernel
