host dominio.com

Obtener el AXFR (zone transfer) de un dominio
host -t dominio.com


host -v dominio
  veremos como va probando los distintos "search" del resolv.conf


Si hacemos peticiones a un servidor raiz, para ver la respuesta tengo que poner "-a" paa ver el resultado.
Viendo Wireshark veo que al preguntar al server raiz me devuelve las respuesta como "Authoritative nameservers" y "Additional records".
Si le pregunto a 1.1.1.1 me lo devuelve en "Answers", que parece que es lo que muestra "host" por defecto.
