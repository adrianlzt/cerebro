http://www.iptables.info/en/iptables-targets-and-jumps.html#SNATTARGET

Esto cambia la cabecera, pero no cambia porque interfaz salen

Los paquetes tcp que vayan a salir por eth0 los sacamos por 10.2.2.1 con SNAT:
iptables -t nat -A POSTROUTING -p tcp -o eth0 -j SNAT --to-source 10.2.2.1:20000-40000
