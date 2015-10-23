http://www.cyberciti.biz/tips/howto-limit-linux-syn-attacks.html

Limita los paquetes de salida hacia la ip. Se aceptan 3 paquetes de golpe, y luego se puede enviar uno cada 10 segundos.

-A OUTPUT -d 10.10.31.6/32 -m limit --limit 6/min --limit-burst 3 -j ACCEPT
-A OUTPUT -d 10.10.31.6/32 -j DROP

‐‐limit rate: Maximum average matching rate: specified as a number, with an optional ‘/second’, ‘/minute’, ‘/hour’, or ‘/day’ suffix; the default is 3/hour.
‐‐limit‐burst number: Maximum initial number of packets to match: this number gets recharged by one every time the limit specified above is not reached, up to this number; the default is 5.

Los 'tokens' del burst se recuperan como dice el parámetro --limit
Ej.: si ponemos --limit 6/min, cada 10 segundos recuperaremos un 'token', por lo que se enviará otro paquete (el tiempo cuenta desde que tenemos menos del límite de tokens, es decir, si tenemos 3 tokens, --limit-burst 3, en cuanto gastemos uno, a los 10 segundos se repondrá)
