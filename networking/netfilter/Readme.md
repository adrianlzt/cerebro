Firewall integrado en linux
http://www.frozentux.net/iptables-tutorial/spanish/iptables-tutorial.html
http://www.thegeekstuff.com/2011/06/iptables-rules-examples/


Explicación de las distintas tablas:
Mangle-prerouting: modificar/deformar el paquete. Cambiar el TOS, TTL, MARK, ...
NAT-prerouting: traducción de direcciones (DNAT)
Mangle-input: modificar/retocar paquetes ya enrutados, pero antes de que lleguen al proceso
Filter-input: donde se filtra. Todo el tráfico pasa por aqui, da igual la interfaz

Internet --> eth0 --> mangle (PREROUTING) --> nat (PREROUTING) --> decisión de enrutamiento --> mangle (INPUT) --> filter (INPUT) -> proc

proc -> decisión enrutamiento -> mangle (OUTPUT) -> nat (OUTPUT) -> filter (OUTPUT) -> mangle (POSTROUTING) -> nat (POSTROUTING) -> inet

Mangle-output: se recomienda no usarlo, efectos secundarios
Nat-output: puede ser usada para hacer NAT a los paquetes que salen desde el firewall
Filter-output: filtramos los paquetes salientes de nuestro host local
Mangle-postrouting: modificar los paquetes antes de que dejen nuestro host, pero después de tomar las decisiones de enrutamiento. Esta cadena será alcanzada tanto por los paquetes que atraviesan el cortafuegos, como por los generados por él mismo
Nat-postrouting: traducción de direcciones (SNAT,MASQUERADE)


Paquetes reenviados:
inet -> mangle (PREROUTING) -> mangle (FORWARD) -> filter(FORWARD) -> mangle (POSTROUTING) -> nat (POSTROUTING) -> inet

Mangle-forward: El paquete es enviado a la cadena FORWARD de la tabla mangle. Ésto puede aprovecharse para necesidades muy específicas dónde queremos modificar paquetes después de la decisión de enrutamiento inicial, pero antes de la última decision de enrutamiento, hecha justo antes de que el paquete sea enviado.
Filter-forward: El paquete es enrutado hacia la cadena FORWARD. Solamente los paquetes reenviados pasan por aquí y es donde hacemos todo el filtrado. Ten en cuenta que todos los paquetes reenviados (en cualquier dirección) pasan por aquí, así que necesitarás pensar en éllo cuando escribas tu conjunto de reglas.
