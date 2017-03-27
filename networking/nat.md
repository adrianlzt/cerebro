https://es.wikipedia.org/wiki/Traducci%C3%B3n_de_direcciones_de_red

Mirar stun.md y turn.md, protocolo para "atravesar" NATs



Generalmente en las redes IPv4 todos los dispositivos tiene ips privadas y salen a internet a través de un servidor NAT (network address translation).
Cuando un dispositivo de la red interna intenta salir el servidor crea un mapeo (ip_privada:puerto_privado <-> ip_publica:puerto_publico).

Hay distintos tipos de nat según se asocie todos los puertos de una ip privada a una publica, solo un puerto, etc.

# Tipos de NAT

## Symmetric NAT

