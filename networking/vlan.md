VLAN: virtual lan
Simular redes físicas distintas.
Generalmente se asigna cada VLAN a cada subred.


Crear una interfaz virtual en una vlan determinada:
vconfig add <interfaz> <num-vlan>

Con el comando ip:
ip link add link eth1 name eth1.1248 type vlan id 1248


Con esto creamos interfaces, que luego tenemos que configurar con ifconfig, ip addr o lo que sea



# Private VLAN
https://en.wikipedia.org/wiki/Private_VLAN

Limitar la conexión entre usuarios de la misma red.

Para entenderlo podemos ver que tenemos 3 vlan.
1.- vlan de uplink
2.- vlan private isolated
3.- vlan private community

Los usuarios en la vlan isolated no pueden hablar entre sí, solo hacia el uplink.
Los usuarios de la vlan community pueden haber entre sí y hacia el uplink.
