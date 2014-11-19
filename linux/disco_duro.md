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


