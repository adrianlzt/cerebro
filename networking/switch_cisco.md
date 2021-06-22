Mucha parte de la configuración es común con los routers.
Esa parte la mantengo en router_cisco.md


# Tabla MAC
Tabla donde relaciona direcciones MAC, con puertos físicos y VLANs.
show mac address-table


# VLAN
https://www.practicalnetworking.net/stand-alone/configuring-vlans/
networking/vlan.md

Se hace en dos pasos:
 - definir las distintas VLAN
 - asignar las VLAN a los puertos

Para definir una vlan simplemente:
vlan NN
También se le puede añadir un nombre:

vlan NN
  nombre XXX


Asignar al switchport una VLAN.

Access mode:
interface GigabitEthernet0/2
 switchport mode access
 switchport access vlan 43

Trunk mode (incrementa el riesgo de saturación del enlace).
Enlace por donde podrán saliar varias VLANs:
interface Port-channel1
 switchport mode trunk
 switchport trunk native vlan 7
 switchport trunk allowed vlan 7

También podemos especifir una lista y rangos:
switchport trunk allowed vlan 7,19,36,43-45,48,49,52,55-57,65-67,77,84,86,99

Algunos switches antigunos nos obligará a definir el tipo de encapsulado antes poner la interfaz en modo trunk:
switchport trunk encapsulation dot1q

No es obligatorio tener definida la native vlan

Si queremos añadir VLANs a la lista de allowed, podemos volver a definir el comando o usar add:
switchport trunk allowed vlan add 30

Si queremos quitar, o volvemos a definir el comando o quitamos (eso generará el comando "allowed vlan NNN" calculando lo que queremos):
switchport trunk allowed vlan remove 20


## vlan internal allocation policy ascending
http://iprouteswitch.blogspot.com/2014/09/vlan-internal-allocation-policy.html#:~:text=vlan%20internal%20allocation%20policy%20ascending,-If%20you%20have&text=In%20short%2C%20it%20means%20that,though%20the%20calendar%20says%202014).

Configuración para que los puertos marcados como routed se les asigne automáticamente una VLAN >= 1006 para dejarlos aislados del resto.


## Mostrar config
show vlan brief
  nos muestra las VLANs definidas y en que puertos están configuradas como access ports

show interfaces trunk
  para ver como están configuradas las interfaces en los puertos trunk

show interfaces <intf> switchport
  por si queremos ver la config en concreto de un switchport

show interfaces status
  para cada puerto nos dice sus VID-access o si es VLAN-trunk.


## Dynamic Trunking Protocol (DTP)
Protocolo que permite negociar para convertirse automáticamente en un puerto trunk.


## Routing / IP
Si queremos que nuestro switch tenga IP usaremos una interfaz "vlan".
Si no queremos crear ninguna específica, usaremos VID=1, la por defecto "native".
conf term
ip routing
interface vlan 1
  ip address 172.17.0.254 255.255.255.0
  no shutdown

Ver la config ip
sh ip interface vlan 100

Si usamos otra VLAN, deberemos permitir el acceso de esa VLAN por el trunk.
O podemos configurar una interfaz access con esa VLAN, de manera que por ahí el tráfico circule sin tagear.

Ejemplo: https://community.cisco.com/t5/discusiones-routing-y-switching/asignaci%C3%B3n-de-ip-a-vlan-administrativa/td-p/3357709


### Ruting VLAN (SVI)
Podemos configurar el switch para que haga routing entre distintas redes.
Tendremos que configurar una IP por VLAN.

El switch tiene que tener activado el routing (que a veces viene por defecto):
ip routing

interface vlan 20
  ip address 172.17.0.254 255.255.255.0
  no shutdown

Se creará la interfaz virtual "Vlan20" con esa IP.
Se meterá en la tabla de rutas:
C        172.17.0.0/24 is directly connected, Vlan20
L        172.17.0.254/32 is directly connected, Vlan20

Para ver las interfaces:
show ip interface brief




# Errores

## interface auto trunk
Command rejected: An interface whose trunk encapsulation is "Auto" can not be configured to "trunk" mode.
Al configurar un puerto en modo trunk, hace falta pasarle primero (es un error en switches viejos):
switchport trunk encapsulation dot1q




## CDP-4-DUPLEX_MISMATCH
%CDP-4-DUPLEX_MISMATCH: duplex mismatch discovered on GigabitEthernet0/0 (not half duplex), with R3 Ethernet1/0 (half duplex).

https://delfirosales.blogspot.com/2012/02/duplex-mismatch-discovered.html
Tenemos conectada una interfaz half-duples con otra full-duplex

Forzar full duplex en la interfaz que esté en half duplex.
interface xxx
duplex full
