## Configuración

/etc/systemd

# Unit files
/etc/systemd/system
  admin customized files
/run/systemd/system
/usr/lib/systemd/system
  los creados por los RPMs
  /etc tiene precedencia sobre /usr
/etc/systemd/system/unit.d/
  aqui pondremos ficheros .conf
  confs adicionales

Ejemplo:
/etc/systemd/system/unit.d/customdependency.conf
  [Unit]
  Requires=new dependency
  After=new dependency

Editar unidades:
https://wiki.archlinux.org/index.php/Systemd#Editing_provided_unit_files



# Ejemplo básico
[Unit]
Description=Foo
After=network.target

[Service]
ExecStart=/usr/sbin/foo-daemon
Restart=on-failure

[Install]
WantedBy=default.target


# Dependencias / Orden
dependency significa que si la unidad A se activa, la unidad B debe activarse también
order significa que la unidad A debe activarse antes de la B
[Install]
WantedBy=multi-user.target

Esto hará que al habilitar nuestra unidad se cree un enlace entre esta unidad y /etc/systemd/system/multi-user.target.wants/


Dependencias que requiere nuestra unidad:
systemctl list-dependencies sshd

Unidades que dependende de nuestra unidad:
systemctl list-dependencies --reverse sshd


El sistema arranca default.target y este arrancará todas las dependencias que dependan de él.
Se activarán en paralelo excepto si hay orden entre ellas.
[Unit]
After=network.target




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



# Dynamic generators
http://www.freedesktop.org/software/systemd/man/systemd.generator.html

/usr/lib/systemd/system-generators
/run/systemd/generator


# Templates
foo@.service funciona como configuración para cualquier foo<CUALQUIERCOSA>.service


# Restart
http://www.freedesktop.org/software/systemd/man/systemd.service.html

Restart=
no
always
on-success
on-failure
on-abnormal
on-abort
on-watchdog

