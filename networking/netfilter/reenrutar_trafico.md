http://www.linuxquestions.org/questions/linux-networking-3/need-iptables-rule-to-force-outgoing-interface-792449/

http://serverfault.com/questions/345111/iptables-target-to-route-packet-to-specific-interface
  en la respuesta vienen más detalles importantes

Con esto podemos, por ejemplo, reenviar el tráfico de una ip a una determinada interfaz.
También podemos hacer que todo el tráfico de un usuario vaya por una determinada interfaz.



Crear tabla de rutas (hacer map de la palabra "hof" al número 1, también podemos usar solo números y evitar escribir ese fichero):
echo 1 hof >> /etc/iproute2/rt_tables

La marca "65" se asocia a la tabla 1 (hof):
ip rule add fwmark 65 priority 1000 table hof

Lo que esté en la tabla "hof", es decir, los paquetes marcados como 65, se enrutan por tun0
ip route add default via 192.168.1.10 dev tun0 table hof

Vaciar caches para que vuelva a calcular rutas:
ip route flush cache

Los paquetes de salida se marcan como 65
iptables -t mangle -A OUTPUT -p tcp --dport 465 -j MARK --set-mark 65

Enmascarar la ip de salida para que sea la de la interfaz por la que salimos
iptables -t nat -A POSTROUTING -o tap0 -j SNAT --to-source 10.0.0.2
iptables -t nat -A POSTROUTING -o tun0 -j MASQUERADE
  si la ip de tun0 es dinámica, usar MASQUERADE

relax the reverse path source validation. If you skip this, you will receive packets, but packets do not get accepted.
sysctl -w net.ipv4.conf.tap0.rp_filter=2


# Con SNAT
http://www.iptables.info/en/iptables-targets-and-jumps.html#SNATTARGET

Esto cambia la cabecera, pero no cambia porque interfaz salen

Los paquetes tcp que vayan a salir por eth0 los sacamos por 10.2.2.1 con SNAT:
iptables -t nat -A POSTROUTING -p tcp -o eth0 -j SNAT --to-source 10.2.2.1:20000-40000
