https://es.wikipedia.org/wiki/Traducci%C3%B3n_de_direcciones_de_red

Mirar stun.md y turn.md, protocolo para "atravesar" NATs


Generalmente en las redes IPv4 todos los dispositivos tiene ips privadas y salen a internet a través de un servidor NAT (network address translation).
Cuando un dispositivo de la red interna intenta salir el servidor crea un mapeo (ip_privada:puerto_privado <-> ip_publica:puerto_publico).

Hay distintos tipos de nat según se asocie todos los puertos de una ip privada a una publica, solo un puerto, etc.

# Tipos de NAT

Basic NAT / One-to-One NAT: una IP privada se mapea a una ip pública (para casos donde tenemos un pool de IPs publicas grande). Prácticamente no se usa

One-to-many NAT / NAPT / PAT / IP masquerading: ss cuando se hace el mapeo de un puerto privado de una ip privada, a un puerto (distinto) de la ip pública.
Este es el que suele significar NAT.


# Formas de realizar el mapeo

En la vida real, los nateadores pueden mezclar estas técnicas.

## Full-cone NAT
Se mapea iIP:iPort con eIP:ePort, todos los paquetes de iIP:iPort se enviarán por eIP:ePort
Todos los paquetes de iIP:iPort salen por eIP:ePort
Cualquiera, en internet, puede enviar paquetes a eIP:ePort y llegarán a iIP:iPort

## Restricted-cone NAT
Se mapea iIP:iPort con eIP:ePort, todos los paquetes de iIP:iPort se enviarán por eIP:ePort
Todos los paquetes de iIP:iPort salen por eIP:ePort
Un cliente externo (hIP:hPort) puede enviar a iIP:iPort, a través de eIP:ePort, siempre que iIP:iPort haya enviado antes enviado un paquete a hIP:N (cualquier puerto)

## Port-restricted cone NAT
Como el anterior, perto el puerto de conexión a 'h' importa.
Se mapea iIP:iPort con eIP:ePort, todos los paquetes de iIP:iPort se enviarán por eIP:ePort
Todos los paquetes de iIP:iPort salen por eIP:ePort
Un cliente externo (hIP:hPort) puede enviar a iIP:iPort, a través de eIP:ePort, siempre que iIP:iPort haya enviado antes enviado un paquete a hIP:hPort

## Symmetric NAT
Cada vez que se establece una conexión desde iIP:iPort, se asocia un mapeo eIP:ePort distinto.
Solo el receptor de la conexión puede enviar paquetes de vuelta a iIP:iPort


Para saber que tipo de nateo tenemos mirar stun.md


# NAT transversal
Para más detalle sobre NAT transversal mirar nat.md
Artículo con mucho detalle: https://tailscale.com/blog/how-nat-traversal-works

Aquí se recogen las técnicas para interconectar nodos que se encuentran detrás de firewalls y/o NAT.

Tenemos que usar el mismo puerto de salida para gestionar el NAT transversal y la comunicación.

Si solo hay firewalls con estado, necesitamos un side channel para comunicar nuestro IP:puerto de salida.
Al enviar al otro cliente haremos UPD hole punching y en otro lado ya nos podrá enviar.

Si tenemos SNAT "fácil" (endpoint independent mapping, EIM; el puerto origen siempre se mapea al mismo de salida), podemos usar un servidor STUN. El cliente envía un paquete al STUN y este le devuelve la IP:puerto públicos. Luego se intercambia esa información por el side channel. En este punto tenemos dos casos, según la configuración del firewall.
Si el firewall es endpoint independent, como ya habremos abierto el hole, ya podremos recibir.
Si es firewall dependant (puede ser solo por IP destino, o IP:puerto destino), tendremos que primero enviar un paquete al destino para que el destino nos pueda enviar.

"Other NAT devices are more difficult, and create a completely different NAT mapping for every different destination that you talk to. On such a device, if we use the same socket to send to 5.5.5.5:1234 and 7.7.7.7:2345, we’ll end up with two different ports on 2.2.2.2, one for each destination. If you use the wrong port to talk back, you don’t get through."
 https://tailscale.com/blog/how-nat-traversal-works#:~:text=Other%20NAT%20devices,don%E2%80%99t%20get%20through.

"The “easy” and “hard” NATs above differ in a single dimension: whether or not their NAT mappings depend on what the destination is. RFC 4787 calls the easy variant “Endpoint-Independent Mapping” (EIM for short), and the hard variant “Endpoint-Dependent Mapping” (EDM for short). There’s a subcategory of EDM that specifies whether the mapping varies only on the destination IP, or on both the destination IP and port. For NAT traversal, the distinction doesn’t matter. Both kinds of EDM NATs are equally bad news for us."
 https://tailscale.com/blog/how-nat-traversal-works#:~:text=The%20%E2%80%9Ceasy%E2%80%9D%20and,news%20for%20us.

"NAT Cone Types"
 https://tailscale.com/blog/how-nat-traversal-works#:~:text=more%20fundamental%20properties%3A-,NAT%20Cone%20Types,-Endpoint%2DIndependent%20NAT

No entiendo muy bien esa tabla. El firewall nos cambia el puerto pero no la IP? Por qué la IP entiendo que es cosa del NAT.
Tal vez lo del firewall es si permite la entrada solo para un ip: puerto de salida ya visto.
Esto puedo probarlo haciendo primero un envío al STUN. Si justo después ya puedo recibir paquetes es que es firewall independent. Si tengo que primero enviar un paquete al destino es que es firewall dependant.

RFCs 4787 (NAT Behavioral Requirements for UDP), 5382 (for TCP) and 5508 (for ICMP)

UC Berkeley guest Wi-Fi blocks all outbound UDP except for DNS traffic.

TURN (Traversal Using Relays around NAT). We’ll skip the protocol details, but the idea is that you authenticate yourself to a TURN server on the internet, and it tells you “okay, I’ve allocated ip:port, and will relay packets for you.” You tell your peer the TURN ip:port, and we’re back to a completely trivial client/server communication scenario

there are no open TURN servers on the internet.

DERP (Detoured Encrypted Routing Protocol), which is a general purpose packet relaying protocol. It runs over HTTP, which is handy on networks with strict outbound rules, and relays encrypted payloads based on the destination’s public key

En tailscale también lo usan como side channel.

Para las hard NAT, parece que usando STUN solemos obtener la IP de salida buena, no en puerto (REQ-2 in RFC 4787). El el caso de tener una hard NAT y una easy NAT podemos intentar el siguiente truco.
Ahí se podría hacer un UDP scan para encontrar el puerto, pero se tardaría mucho y seguramente saltarían elementos de protección de red
El truco está en que el que está detrás de la hard NAT envíe muchos paquetes distintos (256,  por ejemplo, sockets distintos) y el otro lado prueba puertos de forma aleatoria. En pocos segundos podemos encontrar el puerto con una probabilidad del 50%, que irá aumentando según se prueben más puertos.

"Number of random probes" https://tailscale.com/blog/how-nat-traversal-works#:~:text=the%20hard%20side%3A-,Number%20of%20random%20probes,-Chance%20of%20success

common office routers, you’ll find that they have a surprisingly low limit on active sessions.

Hay 3 protocolos (UPnP IGD, NAT-PMP and PCP) para pedir al NAT que encamine nuestro tráfico.
El más antiguo y típico es:
UPnP IGD (Universal Plug’n’Play Internet Gateway Device)

If we strip away all the fluff, we find a very simple request-response that all three of our port mapping protocols implement: “Hi, please forward a WAN port to lan-ip:port,” and “okay, I’ve allocated wan-ip:port for you.”

Es como abrir un puerto en el router, pero de forma dinámica.

Si hay una NAT doble, estos protocolos funcionarán contra la primera, por lo que seguiremos teniendo el problema.

Estás dobles NAT podemos verlas cuando los ISP implementan “carrier-grade NAT”, or CGNAT for short.

Esto sucede cuando el ISP nos da una ip privada, por lo que tenemos un SNAT en nuestro router y luego un cgnat entre el router e internet.

Para estas doble NAT se usarán los trucos ya comentados.

Un problema particular es si tenemos dos clientes dentro de la misma cgnat, ya que STUN no funcionará (necesitaríamos obtener la IP interna del cgnat, no la expuesta a internet). En realidad esto funcionará en las cgnat que tengan configurado hairpinning, que no serán todas.
Hay hardware que tienen el hairpinning roto a nivel de hardware.

En este caso se pueden usar los protocolos de mapeo de puertos. Con que un lado lo tenga, ya tendremos un ip: puerto conocido que solventa el problema.

But CGNAT ISPs tend to turn port mapping protocols off in order to avoid software getting confused by the “wrong” results they would get.
