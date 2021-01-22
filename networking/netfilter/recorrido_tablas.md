https://www.frozentux.net/iptables-tutorial/images/tables_traverse.jpg
http://inai.de/images/nf-packet-flow.png
http://www.iptables.info/en/structure-of-iptables.html



Esquema simplificado para algunos casos. No contempla por ejemplo que pasa cuando se hace forwarding al haber tocaro en nat.prerouting.
Mirar mejor la imagen

El flow depende de si el paquete entra en nuestra máquina:
raw.PREROUTING -> mangle.PREROUTING -> nat.PREROUTING -> decision -> filter.INPUT -> app

El tráfico sale de nuestra máquina:
app -> raw.OUTPUT -> mangle.OUTPUT -> nat.OUTPUT -> filter.OUTPUT -> mangle.POSTROUTING -> nat.POSTROUTING
