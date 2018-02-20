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

Escanear todos los discos:
smartctl --scan | cut -d ' ' -f 1 | xargs -n 1 -I {} sh -c "smartctl -q errorsonly -H {} || echo {}"
  solo devuelve output si hay algún error
  con smartctl -a XXX pueden aparecer errores que sucedieron ¿hace tiempo?, que con -H no dice nada

  Tambien, si tenemos arrancado smartd, podemos ver errores en el journal, que no veo con el smartctl:
  Device: /dev/sda [SAT], 18 Offline uncorrectable sectors

  Si queremos un test más completo:
  smartctl -t long /dev/sdc
    tardará como 1h30, para ver los resultados
  smartctl -l selftest /dev/sdc


NO se pueden borrar errores que aparezcan en SMART.


# Errores
DATA CHANNEL IMPENDING FAILURE DATA ERROR RATE TOO HIGH
https://www.redhat.com/archives/nahant-list/2008-September/msg00008.html
Disco no fiable, posiblemente esté teniendo muchos errores no corregidos (mirar con -a)
