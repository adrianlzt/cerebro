Según cuenta el readme de rasdaemon, la información de los fallos se encuentra en el kernel

# rasdaemon
http://git.infradead.org/users/mchehab/rasdaemon.git/blob/HEAD:/README
https://events.static.linuxfound.org/sites/events/files/slides/RAS_presentation_LinuxCon_NA_0.pdf
https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/sec-checking_for_hardware_errors
https://access.redhat.com/solutions/1412953

Su objetivo a largo plazo es mostrar todos los errores de hardware, pero ahora mismo (05-2018) creo que solo saca de memoria.

En debian, para que ras-mc-ctl funcione debemos tambien instalar: libclass-dbi-perl libclass-dbi-sqlite-perl

Chequear si tenemos drives de EDAC (Error Detection and Correction)
ras-mc-ctl --status

Tambien podemos usar "ras-mc-ctl" para generar reportes (deberemos haber arrancado el daemon almacenando en la sqlite con -r):
ras-mc-ctl --summary

Ver errores en la bbdd (necesita la sqlite)
ras-mc-ctl --summary

La sqlite donde se almacenan los errores:
/usr/var/lib/rasdaemon/ras-mc_event.db


Parece que no funciona con kernels viejos (o funciona peor):
While this tool works since Kernel 3.5 (where HERM patches got added), in order to get the full benefit of this tool, Kernel 3.10 or upper is needed.
A partir de 4.12 parece que han deprecado mcelog: https://cateee.net/lkddb/web-lkddb/X86_MCELOG_LEGACY.html

Para versiones anteriores usar mcelog

Que provee rasdaemon:
  A daemon that waits for kernel trace events (rasdaemon)
  A tool to configure DIMMs and do RAS reports (ras-mc-ctl)
  Some contrib tools to test EDAC and to fake inject errors


Se pueden hacer pruebas con los scripts de http://git.infradead.org/users/mchehab/rasdaemon.git/tree/HEAD:/contrib
Pero tenemos que tener el kernel compilado con CONFIG_EDAC_DEBUG.
  En la config del kernel en ncurses está en: Device Drivers -> EDAC -> Debugging

Otra opción es usar el mce-inject, donde necesitaremos cargar un modulo en el kernel:
git clone https://github.com/andikleen/mce-inject && cd mce-inject
make
modprobe mce-inject
./mce-inject test/corrected


Uso
systemctl enable rasdaemon.service
systemctl enable ras-mc-ctl.service

Si queremos enviar los logs de rasdaemon a un fichero dependerá de que versión tengamos de systemd
https://stackoverflow.com/questions/37585758/how-to-redirect-output-of-systemd-service-to-a-file



# mcelog
deprecado en favor de rasdaemon. Usarlo kernels viejos (centos6)
https://mcelog.org/
https://www.cyberciti.biz/tips/linux-server-predicting-hardware-failure.html

mcelog logs and accounts machine checks (in particular memory, IO, and CPU hardware errors) on modern x86 Linux systems.

yum install mcelog
instala un script de init.d y tambien mete un cron.hourly.
El cron solo corre si el service no está corriendo.
Ambos escriben en /var/log/mcelog
Solo se escriben fallos en el log, nada de arranque o parada de los servicios.

Cuando se produce un fallo escribe un montón de lineas para cada evento, donde en ninguna hay fecha.



# Testear inyectando errores
git://git.kernel.org/pub/scm/linux/kernel/git/gong.chen/mce-test.git
