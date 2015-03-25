En el log:
My unqualified host name (foo.bar) unknown; sleeping for retry

Nuestra máquina debe tener un FQDN.
Solución fácil, en el /etc/hosts cambiar
127.0.0.1 nombremaquina
por
127.0.0.1 nombremaquina.localdomain
