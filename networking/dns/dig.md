Obtener el AXFR (zone transfer) de un dominio
dig @ns.domain.com dominio.com AXFR

Obtener todos los registros
dig example.com ANY

Servidor en otro puerto
dig -p 533 @server example.com


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


Hacer una petición recursiva, realizando todo el trabajo, desde ir a los root servers, dominios de primer nivel, etc:
https://ns1.com/blog/using-dig-trace
dig +trace www.example.com


# Domain history checker
https://whoisrequest.com/history/
Nos da cambios en los NS (al menos es lo que veo con la prueba que he hecho)

https://dnshistory.org
Valores históricos de todos los tipos de registros

http://dnscheck.iis.se/
En la pestaña avanzado esta interesante toda la info que da

