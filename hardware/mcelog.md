Según cuenta el readme de rasdaemon, la información de los fallos se encuentra en el kernel

# rasdaemon
http://git.infradead.org/users/mchehab/rasdaemon.git/blob/HEAD:/README
https://events.static.linuxfound.org/sites/events/files/slides/RAS_presentation_LinuxCon_NA_0.pdf
https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/sec-checking_for_hardware_errors

Su objetivo a largo plazo es mostrar todos los errores de hardware, pero ahora mismo (05-2018) creo que solo saca de memoria.

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


Uso
systemctl enable rasdaemon.service
systemctl enable ras-mc-ctl.service

Si queremos enviar los logs de rasdaemon a un fichero dependerá de que versión tengamos de systemd
https://stackoverflow.com/questions/37585758/how-to-redirect-output-of-systemd-service-to-a-file



# mcelog
deprecado en favor de rasdaemon
https://mcelog.org/
https://www.cyberciti.biz/tips/linux-server-predicting-hardware-failure.html

mcelog logs and accounts machine checks (in particular memory, IO, and CPU hardware errors) on modern x86 Linux systems.



# Testear inyectando errores
git://git.kernel.org/pub/scm/linux/kernel/git/gong.chen/mce-test.git
