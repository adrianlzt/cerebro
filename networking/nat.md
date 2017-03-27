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
