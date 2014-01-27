Usar el comando: ip

# ANTIGUO #
Cambiar ip y ruta por defecto
ifconfig eth0 10.9.1.16 netmask 255.255.224.0 && route del default && route add default gw 10.9.0.1

Accedemos  a la red 192.168.2.0/24 a través del host 10.5.6.70
route add -net 192.168.2.0 netmask 255.255.255.0 gw 10.5.6.70
route add -net 192.168.2.0/24 gw 10.5.1.5
route add -host 182.168.2.3 gw 10.5.1.180

Si la ip que ponemos en gateway no la tenemos a nuestro “alcance” (route debe saber como llegar) nos dará el error: SIOCADDRT: No existe el proceso.

Para borrar:
route del -net 192.168.2.0 netmask 255.255.255.0
route del default

También podemos especificar la interfaz:
route add -net 192.168.2.0 netmask 255.255.255.0 gw 10.5.6.17 eth1


Mostrar rutas en IPv6
$ route -n -Ainet6

En IPv4
$ route -n -Ainet

Ruta de salida por una interfaz alias:
ifconfig eth0:1 192.168.0.130
route add -host 10.5.51.5 dev eth1:1
