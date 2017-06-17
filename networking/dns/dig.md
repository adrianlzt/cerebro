Obtener el AXFR (zone transfer) de un dominio
dig @ns.domain.com dominio.com AXFR

Obtener todos los registros
dig example.com ANY


MX de un server
dig server.com MX

IPv6 de un dominio
dig dominio.com AAAA


Servidor autoridad de un dominio
dig pepe.com SOA

Resolución inversa:
dig -x 216.58.211.227

Equivalente a hacer:
dig 227.211.58.216.in-addr.arpa. PTR


Tipos registros:
A, AAAA, MX, AXFR, NS, SOA, TXT, PTR, CNAME


# Domain history checker
https://whoisrequest.com/history/
Nos da cambios en los NS (al menos es lo que veo con la prueba que he hecho)

https://dnshistory.org
Valores históricos de todos los tipos de registros

http://dnscheck.iis.se/
En la pestaña avanzado esta interesante toda la info que da

