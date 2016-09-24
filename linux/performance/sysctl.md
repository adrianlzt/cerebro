https://www.kernel.org/doc/Documentation/sysctl/

Nos permite tunear el sistema.
Nos agrega los tunales de /proc y /sys

sysctl -a
  Nos muestra todos los tunables

sysctl -w key=valor
  Setear valor


Para cambios persistentes meter en ficheros separados en /etc/sysctl.d/*conf

Unidad de systemd:
systemd-sysctl

/etc/sysctl.conf deprecated desde systemd 207
