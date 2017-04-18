http://docs.icinga.org/icinga2/latest/doc/module/icinga2/chapter/getting-started#itl
Setting up Livestatus

Necesario para Icinga Web 2 -> ANTIGUO, ahora usa idodb

ln -s /etc/icinga2/features-available/livestatus.conf /etc/icinga2/features-enabled/
ln -s /etc/icinga2/features-available/compatlog.conf /etc/icinga2/features-enabled/
  Este último es para poder usar historicos con livestatus (por ejemplo 'log')
service icinga2 restart

El grupo del socket es icingacmd:
# stat /var/run/icinga2/cmd/livestatus
  File: «/var/run/icinga2/cmd/livestatus»
    Size: 0               Blocks: 0          IO Block: 4096   `socket'
    Device: fd00h/64768d    Inode: 400462      Links: 1
    Access: (0660/srw-rw----)  Uid: (  497/  icinga)   Gid: (  497/icingacmd)

Por lo que tendremos que añadir el servidor web a dicho grupo para que pueda atacar al socket:
usermod -a -G icingacmd apache


