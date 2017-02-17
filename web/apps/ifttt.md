https://ifttt.com

IFTTT is a service that lets you create powerful connections with one simple statement:

if this then that


# Custom

## Trigger
Usar un curl para iniciar un IFTTT
Entrar en https://maker.ifttt.com/use/bntv0VFPe0V para ver las URLs y el formato de envio

## Actions
Usar un webservice para terminar un IFTTT
Creamos un IFTTT y en el "that" seleccionamos "Maker"
Nos preguntará una URL pública
Nos enviará un GET/POST/DELETE


# IPv6
No tiene soporte para IPv6

He montado una especie de proxy con google app engine.
Código, no testeado: https://gist.github.com/adrianlzt/6f9e67fe47c67eca46655b8033bcf862

Al configurar la url en Maker ponerla asi:
https://ifttt.appspot.com/?query=IFTTT&ipv6=http://xxxx.duckdns.org
