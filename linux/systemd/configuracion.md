## Configuración

/etc/systemd

# Unit: descripción, ordenación, dependencias
# http://www.freedesktop.org/software/systemd/man/systemd.unit.html
[Unit]
Description=My Advanced Service
After=etcd.service
After=docker.service
Requires=network.target dnsmasq.service

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


Este Install lo que hará es:
ln -s /etc/systemd/system/NUESTRO.service /etc/systemd/system/multi-user.target.wants/NUESTRO-network.service


Variables que nos proporciona systemd:
%n	Full unit name	Useful if the name of your unit is unique enough to be used as an argument on a command.
%m	Machine ID	Useful for namespacing etcd keys by machine. Example: /machines/%m/units
%b	BootID		Similar to the machine ID, but this value is random and changes on each boot
%H	Hostname	Allows you to run the same unit file across many machines. Useful for service discovery. Example: /domains/example.com/%H:8081

A full list is on the systemd man page.
