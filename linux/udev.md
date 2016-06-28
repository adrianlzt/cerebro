http://www.reactivated.net/writing_udev_rules.html#
Ejemplos: /usr/lib/udev/rules.d

Gestion de dispositivos

udevadm monitor
udevmonitor
  consola que nos muestra los eventos udev

Con esto podemos ver los eventos que suceden al conectar y desconectar cosas.

Para ver info de un dev particular:
udevadm info -a --path /devices/pci0000:00/0000:00:14.0/usb2/2-3/2-3.3/2-3.3:1.0/sound/card2

Las variables que aparece ahí las podremos usar para crear las reglas.

Regla por ejemplo para ejecutar un comando al conectar unos cascos Jabra:
/etc/udev/rules.d/jabra.rules
ACTION=="add" SUBSYSTEM=="sound" ATTRS{product}=="Jabra EVOLVE 20 MS" RUN+="/usr/bin/my_program"

udevadm control --reload-rules


Y lo probamos con:
udevadm test /devices/pci0000:00/0000:00:14.0/usb2/2-3/2-3.3/2-3.3:1.0/sound/card2

Para ver los eventos que se generan
journalctl -fu systemd-udevd

ACTION puede ser add o remove

Ejemplo ejecutando un comando de pulseaudio con udev:
https://www.reddit.com/r/archlinux/comments/1afh8s/frustration_with_pulseaudio_and_udev_rules/


# BUG 2009, privilege scalation
https://jon.oberheide.org/blog/2009/04/20/udev-local-privilege-escalation/
http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2009-1185

/etc/udev/rules.d/95-udev-late.rules
Ejecuta el comando definido en REMOVE_CMD cuando se quita un dispositivo.

Crea un socket tipo NETLINK para avisar a udev de que el dev /dev/foo se ha desconectado y que ejecute el comando en /tmp/run

Versiones afectadas:
http://www.ubuntu.com/usn/usn-758-1/

