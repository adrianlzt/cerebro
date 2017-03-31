# STUN
Es un protocolo que se usa para descubrir nuestra ip pública y un puerto que el NAT nos haya asociado.

Para saber que tipo de NATting ejecutamos (pip install pystun, con python2):
pystun
Ejecutarlo varias veces, porque me da respuestas distintas.

Para mirar como funciona el conectar por con este método, mirar networking/udp_hole_punching.md

## Servidores publicos
stun.ekiga.net
stun.ideasip.com
stun.voiparound.com
stun.voipbuster.com
stun.voipstunt.com
stun.voxgratia.org



# TURN
Cuando no es posible la conexión usando STUN (el firewall o nat bloquea las conex entrantes con otro origen, symmetric nat) usaremos TURN.
Este servidor hará de intermediario en la conexión.


# Python
https://github.com/node/turn-client
Ejemplos de clientes en C y python

Libreriay y cliente:
https://pypi.python.org/pypi/pystun
https://github.com/jtriley/pystun
