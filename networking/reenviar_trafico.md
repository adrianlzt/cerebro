http://www.linuxquestions.org/questions/linux-networking-3/need-iptables-rule-to-force-outgoing-interface-792449/

Con esto podemos, por ejemplo, reenviar el tráfico de una ip a una determinada interfaz.
También podemos hacer que todo el tráfico de un usuario vaya por una determinada interfaz.


Crear tabla de rutas:
echo 1 hof >> /etc/iproute2/rt_tables

La marca "65" se asocia a la tabla hof
ip rule add fwmark 65 table hof

Lo que esté en la tabla "hof", es decir, los paquetes marcados como 65, se enrutan por tun0
ip route add default via 192.168.1.10 dev tun0 table hof

Los paquetes de entrada a la máquina se marcan como 65
iptables -t mangle -A PREROUTING -s 192.168.0.10 -p tcp -m tcp --dport 8083 -j MARK --set-mark 65

Los paquetes de salida se marcan como 65
iptables -t mangle -A OUTPUT -s 192.168.0.10 -p tcp -m tcp --dport 8083 -j MARK --set-mark 65
