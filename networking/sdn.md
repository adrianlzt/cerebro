Floodlight -> controlador openflow para vswitchs open source. Gestión del plano de control
Este plano de control le meterá al OpenVSwitch lo que necesite (las reglas de forward que necesite)


Plano de control + plano de datos.

El plano de control es un punto único lógico (clusterizable, no es punto único de fallo).
Aunque fallase el plano de control el plano de datos seguiría funcionando.
Protocolo estandar para comunicar los dos planos (openflow es el estandar de facto).

Ya no hay routing, ya no hay swithcing.
Ejemplo: mac termina en 2, y el puerto es tal, haga tal acción.

El OpenFlow 1.0 determina una serie de headers para definir un flow, y una serie de acciones.
Las acciones pueden ser dinámicas o estáticas.
La acción de enviar al controlador, hace que el paquete se analize en el controlador, y generar reglas efímeras para ese paquete.

Se puede balancear:
Ejemplo, el primer paquete de una ip origen lo enviamos al controlador, y este crea un flow, donde se decide a donde enviarlo. El resto de paquetes se le aplicaría el flow directamente.


## Proyecto OpenAppsCloud ##
Mejoras sobre Quantum/Neutron. Añaden:
  Overlay network
  OpenFlow based control plane
  SDN services logic
Han extendido Horizon y la CLI/API

Mejoras de hacer filtrado con Security Zones y Security Rules.
Lo "normal" de OpenStack es filtrar en destino con iptables. El tráfico se cursa, y se tira en el host destino.
Con SDN el tráfico no se cursa, ya que en cuanto llega al plano de control se tira.

SDN-based private VLAN: vlans en la que no se ven los equipos entre si, pero si ven al gateway. Esta funcionalidad suele venir en los equipos de gama alta.

SDN gateway: también implementan conexión con SW legacy que no usen openflow.


# Demo
Todas las máquinas conectadas a una VxLAN, separadas por grupos: publico, FE y BE.

Definir la subnet que queramos, que será el direccionamiento privado para los hosts. Automáticamente se crea el router, y nos crea la subred.

En este caso no usan "Seucrity Groups", tienen uno por defecto que pone todo abierto.

Crean instancias y la meten a la network que han creado previamente.

En principio las máquinas no se ven entre ellas porque por defecto está denay all.

Asignan IP pública a las dos instancias que serán públicas.

Luego se definen los flujos entre los disintos grupos que hemos creado. Al definir por ejemplo que permitimos tráfico TCP/80, también se permite el tráfico ARP.
Un paquete ARP que preguntase por una ip que no debe poder conectarse, se tirará el paquete al llegar al plano de control.


# Demo 2
3 VxLAN: publico, FE, BE
Una vpn que conecta a todas ellas por ssh
Las máquinas no se pueden ver entre ellas a través de la red que las conecta a la vpn.
