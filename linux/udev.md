Gestion de dispositivos

udevmonitor
  consola que nos muestra los eventos udev


# BUG 2009, privilege scalation
https://jon.oberheide.org/blog/2009/04/20/udev-local-privilege-escalation/
http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2009-1185

/etc/udev/rules.d/95-udev-late.rules
Ejecuta el comando definido en REMOVE_CMD cuando se quita un dispositivo.

Crea un socket tipo NETLINK para avisar a udev de que el dev /dev/foo se ha desconectado y que ejecute el comando en /tmp/run

Versiones afectadas:
http://www.ubuntu.com/usn/usn-758-1/

