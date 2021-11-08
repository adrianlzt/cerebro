https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/System_Administrators_Guide/sect-Managing_Services_with_systemd-Targets.html

Dentro de /etc/systemd/system tendremos directorios NOMBRE.target.wants
Estos directorio son algo asi como los antiguos runlevels. En systemd los targets son conjuntos de units.

Systemd targets are represented by target units. Target units end with the .target file extension and their only purpose is to group together other systemd units through a chain of dependencies. For example, the graphical.target unit, which is used to start a graphical session, starts system services such as the GNOME Display Manager (gdm.service) or Accounts Service (accounts-daemon.service) and also activates the multi-user.target unit.

Dentro de cada directorio hay enlaces a las unidades que deben arrancarse para cada uno de los targets.
Cada service en su sección [Install] especifica en que target debe instalarse:

[Install]
WantedBy=basic.target


Listar targets:
systemctl list-units --type target

Cambiar de target:
systemctl isolate name.target

Ver el defaul target:
systemctl get-default
  /etc/systemd/system/default.target

Cambiar el default target:
systemctl set-default name.target

Estado de las units de un target:
systemctl list-dependencies default.target
systemctl --user list-dependencies default.target


Runlevel   Target Units                            Description
0          runlevel0.target, poweroff.target       Shut down and power off the system.
1          runlevel1.target, rescue.target         Set up a rescue shell.
2          runlevel2.target, multi-user.target     Set up a non-graphical multi-user system.
3          runlevel3.target, multi-user.target     Set up a non-graphical multi-user system.
4          runlevel4.target, multi-user.target     Set up a non-graphical multi-user system.
5          runlevel5.target, graphical.target      Set up a graphical multi-user system.
6          runlevel6.target, reboot.target         Shut down and reboot the system.

