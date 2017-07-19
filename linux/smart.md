http://smartlinux.sourceforge.net/smart/index.php
http://www.activasistemas.com/blog/2013/11/22/comprobando-la-salud-de-los-discos-duros-en-un-sistema-linux/

Comprobar el estado del disco duro:
http://www.cyberciti.biz/tips/linux-find-out-if-harddisk-failing.html

Troubleshooting
http://www.cyberciti.biz/datacenter/linux-unix-bsd-osx-cannot-write-to-hard-disk/

Monitorizar el estado del disco duro:
http://www.cyberciti.biz/tips/monitoring-hard-disk-health-with-smartd-under-linux-or-unix-operating-systems.html

En resumen:
apt-get install smartmontools
Editar /etc/default/smartmontools para activar smartd al inicio
Editar /etc/smartd.conf
  Comentar esta línea: DEVICESCAN -d removable -n standby -m root -M exec /usr/share/smartmontools/smartd-runner
  Agregar esta otra: /dev/sda -H -C 0 -U 0 -m pepe@gmail.com
update-rc.d smartmontools enable
service smartmontools start


yum install smartmontools

Discos:
smartctl --scan

Para saber si tienen S.M.A.R.T.
smartctl -i /dev/xxx
  Deberá poner:
  Device supports SMART and is Enabled

Más info:
smartctl -a <disco>

Más info hardware:
smartctl -x <disco>

Estado del disco
smartctl -H <disco>

Temperatura, fecha de fabricación, números de arranques del disco, etc
smartctl --attributes /dev/sda
