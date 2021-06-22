https://www.practicalnetworking.net/stand-alone/vlans/

VLAN: virtual lan
Generalmente se asigna una VLAN a cada subred.

Las dos funciones principales:
  - simular redes físicas distintas.
  - extender una red física más hayá de un switch

Cada VLAN tiene asignado un identificador: VID (VLAN id), valores entre 1 y 4096 (incluídos).
Un switch asigna a cada puerto un VID.
Los puertos con el mismo VID forman ese "virtual switch", es decir, un paquete envíado a un puerto determinado solo podrá comunicarse con los puertos con el mismo VID.
Los puertos sin VID asignado tomarán el default, que es VID=1

Hasta ahora los puertos que configurábamos se llaman "access ports", son puertos que pertenecen a una única VLAN.
Son puerto untagged, es decir, los paquetes ethernet no llevan ninguna información extra.
Cuando los paquetes de esos access ports llegan al switch, se tagean con el VID de dicho puerto.
Esto quiere decir que se añade al paquete ethernet la extensión 802.1q, que añade un campo para definir el VID.

Para poder comunicar switches entre si y lograr extender las redes físicas existen los puertos trunk.
Estos puertos permiten el paso de varias VLANs.
En la configuración del switch se definirán que el puerto es tipo trunk y que VLANs pueden circular por él.

Si conectamos un puerto trunk a un router, generalmente en el router crearemos interfaces virtuales, una por vlan que aceptamos, cada una con su ip.

## Native VLAN
Este concepto se refiere a como actua el switch cuando recibe tráfico no tageado por un puerto trunk.
El switch estará configurado para asignar un VID determinado a ese tráfico no tageado en cada puertos trunk (cada trunk tiene su native vlan).
De manera similar, el tráfico que salga por el trunk donde su VID == Native VLAN, será enviando untagged.

Hay que tener cuidado con esto, ya que dos switches con Native VLAN distintas pueden lograr que se evite la comunicación entre dos dispositivos finales que están en la misma VLAN.
Ejemplo:
pc1----Access-vlan8-----switch1(native-vlan=8)-----trunk------switch2(native-vlan=10)-----Access-vlan8-----pc2
El paquete que envíe pc1 (VID=8) al salir por la interfaz trunk del switch1 será untageado.
Al llegar al switch2 será vuelto a tagear, pero con VID=10, por lo que nunca llegará a pc2.

En cisco, si dos switches tienen Native VLAN distintas configuradas, sacan mensajes de error:
%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered on GigabitEthernet0/0 (20), with sw3 GigabitEthernet0/1 (1).
Y parece que bloquea el tráfico por esa rama con Native VLAN inconsistentes:
%SPANTREE-2-BLOCK_PVID_PEER: Blocking GigabitEthernet0/0 on VLAN0010. Inconsistent peer vlan.


## Dominios de broadcast
Se llama así al conjunto de puertos que recibe un paquete broadcast de ethernet.
Lo que nos está diciendo es que puertos están comunicados teniendo en cuentra los "filtrados" de las VLAN.

## Configuración
Mirar networking/router_cisco.md



# Linux
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
