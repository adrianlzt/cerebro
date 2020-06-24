Si un proceso está escuchando en "::", esto es un wildcard para escuchar en todas las interfaces IPv4 + IPv6


Ejemplo:
servidor: nc -s "::" -kl -p 8090

Los clientes podrán conectar con estas dos opciones:
nc 127.0.0.1 8090
nc ::1 8090

