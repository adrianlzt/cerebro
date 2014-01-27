## TEORIA ##
https://learningnetwork.cisco.com/docs/DOC-3770
http://web.archive.org/web/20110227202711/http://www.29west.com/docs/THPM/multicast-address-assignment.html
http://en.wikipedia.org/wiki/Multicast_address

Las direcciones multicast reservan los 4 primeros bits a 1110, por lo tanto van de
224.0.0.0 a 239.255.255.255

Link local: 224.0.0.x

Overlap 32:1, no usar estas direcciones.
224-239.0.0.x
224-239.128.0.x

Site-local multicast addresses are of the form 239.255.x.y, but can grow down to 239.252.x.y if needed. 
Organization-local multicast addresses are of the form 239.192-251.x.y, but can grow down to 239.x.y.z if needed.

## PRACTICA - Linux ##

proc/net/ip_mr_cache
- contains the active multicast routes

/proc/net/ip_mr_vif
- contains the 'virtual' interfaces used by the active multicast routing daemon

/proc/net/dev_mcast
- First is the index of the interface (padded with spaces on the right so the whole field takes up 4 columns). Second is the name of the interface (space-padded to 15 columns). Next is the number of dmi users (space-padded to 5 columns), followed by the number of dmi gusers (space-padded to 5 columns). Last is a byte-by-byte hexdump of the dmi address. 


Conocer subscripciones actuales:
ip maddr
netstat -g
El campo RefCnt nos dice el número de procesos que se han unido a dicho grupo multicast.


Manejar estáticamente rutas multicast
SMCRoute is a command line tool to manipulate the multicast routes of the Linux kernel. It can be used as an alternative to dynamic multicast routers like 'mrouted' in situations where static multicast routes should be maintained and/or no proper IGMP signaling exists.
Subscribir a un grupo multicast: smcroute -j eth0 224.2.1.1
Salir de un grupo multicast: smcroute -l eth0 224.2.1.1 (parece que el leave no lo hace bien, aunque ip maddr no muestra que estamossubscritos, siguen llegando paquetes)


## Troubleshooting
http://www.linuxproblems.org/wiki/How_to_check_Multicasting
http://sourceforge.net/projects/javagroups/files/JGroups/3.3.3.Final/jgroups-3.3.3.Final.jar/download

Recibidor:
java -cp jgroups-3.3.3.Final.jar org.jgroups.tests.McastReceiverTest -mcast_addr 231.12.21.132 -port 45566

Enviador:
java -cp jgroups-3.3.3.Final.jar org.jgroups.tests.McastSenderTest -mcast_addr 231.12.21.132 -port 45566

Se puede usar: -bind_addr 192.168.0.2 para solo unir una interfaz


RedHat:
[En los nodos a testear] # omping nodo1 nodo2
Deberían verse el menasje de joined, y luego mensajes unicast y multicast.
Al terminar (Control+C) muestra estadísticas


Debian:
[nodo1] # ssmpingd
[nodo1] # asmping 224.0.2.1 ip.nodo.1
Deberían verse el menasje de joined, y luego mensajes unicast y multicast.
Al terminar (Control+C) muestra estadísticas



Otra forma: https://gist.github.com/jayjanssen/5697813
