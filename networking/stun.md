# STUN
Es un protocolo que se usa para descubrir nuestra ip pública y un puerto que el NAT nos haya asociado.

Para saber que tipo de NATting ejecutamos (pip install pystun, con python2):
pystun
Ejecutarlo varias veces, porque me da respuestas distintas.

# TURN
Cuando no es posible la conexión usando STUN (el firewall o nat bloquea las conex entrantes con otro origen, symmetric nat) usaremos TURN.
Este servidor hará de intermediario en la conexión.
