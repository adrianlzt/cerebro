
host dominio.com

Obtener el AXFR (zone transfer) de un dominio
host -t dominio.com

host -v dominio
  veremos como va probando los distintos "search" del resolv.conf

Para atacar un server DNS específico

```bash
host dominio 1.1.1.1
host -p 5300 google.com 127.0.0.1
```

Si hacemos peticiones a un servidor raiz, para ver la respuesta tengo que poner "-a" paa ver el resultado.
Viendo Wireshark veo que al preguntar al server raiz me devuelve las respuesta como "Authoritative nameservers" y "Additional records".
Si le pregunto a 1.1.1.1 me lo devuelve en "Answers", que parece que es lo que muestra "host" por defecto.

En ubuntu está en dnsutils
