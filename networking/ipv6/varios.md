# http://www.linuxtopia.org/online_books/network_administration_guides/Linux+IPv6-HOWTO/index.html


Direccion (un interfaz puede tener varias ipv6):
ip -6 addr

Rutas:
ip -6 route
route -A inet6

Caché de vecinos:
ip -6 neigh
	DELAY: esperando respuesta del otro
	REACHABLE: caché válida
	STALE: paso antes de ser borrada. No necesita hacer neigh solicitation.


Ping:
ping6 direc:ip::v6

Es obligatorio definir la interfaz en pings locales
ping6 -I ethx direc:ip::v6
ping6 direc:ip::v6%ethx
Como pueden existir varias direcciones ipv6 en una interfaz, también podemos definir directamente la ipv6 a utilicar:
ping6 -I ip.v6.nuestra ip.v6.a.pinguear


Trazar ruta:
traceroute6 direc:ip::v6
tracepath direc:ip::v6  (salida más limpia)


Resolucion DNS
$ host nombre
nombre has IPv6 address 2001:1313:0:2:fd:ff:fe00:701

$ dig nombre AAAA

$ nslookup
> set q=AAAA
> nombre
