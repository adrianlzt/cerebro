man systemd.exec

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

Ver que unidades han sido modificadas:
systemd-delta

Mostrar el contenido de una:
systemctl cat unit

Crear un fichero de override para cambiar ciertos parametros (/etc/systemd/system/unit.d/override.conf)
Para hacer override de algunos parametros (como ExecStart), tendremos que definirlo primero vacio y luego con el valor que queremos poner.
systemctl edit unit

Copiar una unidad al directorio de unidades custom (/etc/systemd/system/unit) y editarla (intentar usar el método anterior mejor):
systemctl edit --full unit
systemctl edit --full -force unit.service
  la genera si no existe





# Ejemplo básico
[Unit]
Description=Foo
After=network.target

[Service]
ExecStart=/usr/sbin/foo-daemon
Restart=on-failure

[Install]
WantedBy=default.target


# Tipos (en la sección [Service])
https://wiki.archlinux.org/index.php/Systemd#Service_types
Type=simple (default)
Type=forking
Type=oneshot (You may want to set RemainAfterExit=yes as well so that systemd still considers the service as active after the process has exited.)
Type=notify
Type=dbus
Type=idle


# Dependencias / Orden
dependency significa que si la unidad A se activa, la unidad B debe activarse también (se arrancarán en paralelo) (Requires= Wants=). Con Wants= el servicio arrancará aunque lo que quiere falle.
order significa que la unidad A debe activarse antes de la B (After= Before=)
Si nuestra app, grafana por ejemplo, necesita de mysql, meteremos un override (systemctl edit grafana-server) con:
[Unit]
Requires=mariadb.service
After=mariadb.service

Si solo ponemos requires, arrancará grafana y mariadb al mismo tiempo.
Si solo ponemos After=, y mariadb no está marcado para arrancar, grafana arrancará pero no tendrá mariadb disponible.



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
# https://wiki.archlinux.org/index.php/Systemd#Handling_dependencies
[Unit]
Description=My Advanced Service
After=etcd.service
After=docker.service
Requires=network.target dnsmasq.service # Si alguna unidad de esta lista no exista, fallará el arranque. Porque se pare un Require no quiere decir que se pare el que lo necesita
Before=xxx.service
# Wants=... # Es un require opcional, si no existe la otra unidad, no aplica

# Service: como arrancar, parar, recargar, acciones previas, etc
# No daemonizar los procesos para que systemd pueda mantener el control
# http://www.freedesktop.org/software/systemd/man/systemd.service.html
[Service]
ExecStart=/bin/bash -c '/usr/bin/docker start -a apache || /usr/bin/docker run --name apache -p 80:80 coreos/apache /usr/sbin/apache2ctl -D FOREGROUND'
ExecStartPost=/usr/bin/etcdctl set /domains/example.com/10.10.10.123:8081 running
# ExecStartPre=
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
no (por defecto)
always (the service will be restarted regardless of whether it exited cleanly or not, got terminated abnormally by a signal, or hit a timeout)
on-success (solo se reinicia si el proceso ha salido con un RC=0, o tras una señal SIGHUP, SIGINT, SIGTERM or SIGPIPE, o con un RC o señal especificado en SuccessExitStatus)
on-failure (the service will be restarted when the process exits with a non-zero exit code, is terminated by a signal (including on core dump, but excluding the aforementioned four signals), when an operation (such as service reload) times out, and when the configured watchdog timeout is triggered)
on-abnormal (the service will be restarted when the process is terminated by a signal (including on core dump, excluding the aforementioned four signals), when an operation times out, or when the watchdog timeout is triggered)
on-abort (the service will be restarted only if the service process exits due to an uncaught signal not specified as a clean exit status)
on-watchdog (the service will be restarted only if the watchdog timeout for the service expires)

As exceptions to the setting above, the service will not be restarted if the exit code or signal is specified in RestartPreventExitStatus= (see below). Also, the services will always be restarted if the exit code or signal is specified in RestartForceExitStatus= (see below).

Setting this to on-failure is the recommended choice for long-running services, in order to increase reliability by attempting automatic recovery from errors. For services that shall be able to terminate on their own choice (and avoid immediate restarting), on-abnormal is an alternative choice.

RestartSec=100ms
Tiempo que espera antes de reiniciar (por defecto 100ms)


# Watchdog
Podemos diseñar nuestra app para que envie periódicamente señales a systemd de que está bien, y actuar si no se recibe esta señal.
WatchdogSec


# User
https://www.freedesktop.org/software/systemd/man/systemd.exec.html#

[Service]
User=someuser


# Kill
https://www.freedesktop.org/software/systemd/man/systemd.kill.html

KillSignal=SIGINT
por defecto, para parar un servicio, se envia SIGTERM


# Unidad para hacer pruebas
[Unit]
Description=Probando cosas

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/usr/bin/echo "he arrancado"



# Working directory
[Service]
WorkingDirectory=/home/pi


# Environment
[Service]
Environment=ETCD_CA_FILE=/path/to/CA.pem
Environment=ETCD_CERT_FILE=/path/to/server.crt
