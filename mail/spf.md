https://es.wikipedia.org/wiki/Sender_Policy_Framework

Debemos registrar en nuestro server DNS las máquinas que enviaran correos:
midominio.com. IN TXT "v=spf1 mx ptr ~all" 

v= define la versión usada de SPF (versión 1).
mx autoriza a las máquinas con la IP de los registros MX.
ptr autoriza a las máquinas bajo el dominio midominio.com.
~all sugiere desautorización a las máquinas que no encajen en lo autorizado explícitamente.



NOTA IPv6:
Si tenemos ipv6, meter también las IPs de nuestro rango ipv6 a SPF
