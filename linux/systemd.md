http://www.freedesktop.org/wiki/Software/systemd/

Oficial para Ubuntu y Debian (http://www.markshuttleworth.com/archives/1316)
Oficial para RHEL 7 
  https://access.redhat.com/site/articles/754933
  https://access.redhat.com/site/documentation/en-US/Red_Hat_Enterprise_Linux/7-Beta/html-single/System_Administrators_Guide/#chap-Managing_Services_with_systemd

systemd is a system and service manager for Linux, compatible with SysV and LSB init scripts. systemd provides aggressive parallelization capabilities, uses socket and D-Bus activation for starting services, offers on-demand starting of daemons, keeps track of processes using Linux control groups, supports snapshotting and restoring of the system state, maintains mount and automount points and implements an elaborate transactional dependency-based service control logic. It can work as a drop-in replacement for sysvinit. See Lennart's blog story for a longer introduction, and the three status updates since then. Also see the Wikipedia article. If you are wondering whether systemd is for you, please have a look at this comparison of init systems by one of the creators of systemd.


systemctl
  lista de servicios
systemctl status
systemctl status proceso.service
  nos dice script de inicio, desde cuando está activa, pid, cgroup y parámetros de ejecucción
  si está parada nos dice desde cuando, cual era su pid y con que return code salió
systemctl stop rsyslog.service
systemctl disable rsyslog.service
systemctl enable rsyslog.service
  ln -s '/lib/systemd/system/rsyslog.service' '/etc/systemd/system/multi-user.target.wants/rsyslog.service'

## Configuración
# Unit: descripción, ordenación, dependencias
# http://www.freedesktop.org/software/systemd/man/systemd.unit.html
[Unit]
Description=My Advanced Service
After=etcd.service
After=docker.service

# Service: como arrancar, parar, recargar, acciones previas, etc
# No daemonizar los procesos para que systemd pueda mantener el control
# http://www.freedesktop.org/software/systemd/man/systemd.service.html
[Service]
ExecStart=/bin/bash -c '/usr/bin/docker start -a apache || /usr/bin/docker run --name apache -p 80:80 coreos/apache /usr/sbin/apache2ctl -D FOREGROUND'
ExecStartPost=/usr/bin/etcdctl set /domains/example.com/10.10.10.123:8081 running
ExecStop=/usr/bin/docker stop apache
ExecStopPost=/usr/bin/etcdctl rm /domains/example.com/10.10.10.123:8081

# Install: sería como los niveles de init
# Por lo general usaremos el multi-user
# http://www.freedesktop.org/software/systemd/man/systemd.target.html
[Install]
WantedBy=multi-user.target


Variables que nos proporciona systemd:
%n	Full unit name	Useful if the name of your unit is unique enough to be used as an argument on a command.
%m	Machine ID	Useful for namespacing etcd keys by machine. Example: /machines/%m/units
%b	BootID		Similar to the machine ID, but this value is random and changes on each boot
%H	Hostname	Allows you to run the same unit file across many machines. Useful for service discovery. Example: /domains/example.com/%H:8081

A full list is on the systemd man page.


## Templates ##
Optionally, units may be instantiated from a template file at runtime. This allows creation of multiple units from a single configuration file. If systemd looks for a unit configuration file, it will first search for the literal unit name in the file system. If that yields no success and the unit name contains an "@" character, systemd will look for a unit template that shares the same name but with the instance string (i.e. the part between the "@" character and the suffix) removed. Example: if a service getty@tty3.service is requested and no file by that name is found, systemd will look for getty@.service and instantiate a service from that configuration file if it is found.
