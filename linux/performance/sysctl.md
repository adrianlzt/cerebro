https://www.kernel.org/doc/Documentation/sysctl/

Nos permite tunear el sistema.
Nos agrega los tunales de /proc y /sys

sysctl -a
  Nos muestra todos los tunables

sysctl -w key=valor
  Setear valor


Para cambios persistentes:
/etc/sysctl.conf
vm.swappiness=60

Mejor meter en ficheros separados en /etc/sysctl.d/
