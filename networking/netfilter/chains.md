Each chain is a list of rules which can match a set of packets.  Each rule specifies what to do with a packet that matches.  This is called a `target', which may be a jump to a user-defined chain in the same table.

-N, --new-chain chain
       Create a new user-defined chain by the given name.  There must be no target of that name already.

Creando una chain:
iptables -t nat -N NOMBRE

Usando la chain:
iptables -t nat -A NOMBRE ...

Redirigiendo trafico a una chain:
iptables -t nat ... -J NOMBRE

Borrar una chain:
iptables -t nat -X NOMBRE
