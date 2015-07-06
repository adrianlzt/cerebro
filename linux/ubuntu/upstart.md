DEPRECATED en favor de systemd
http://www.markshuttleworth.com/archives/1316

CentOS 6.x tiene upstart


http://upstart.ubuntu.com/cookbook

Nuevo sistema para levantar servicios


tareas del sistema en: /etc/init/
para el usuario en: $HOME/.init/
  para que funcione con usuarios hay que realizar pequeños cambios

Los comandos son:
initctl
start
stop


Ejemplo de fichero .conf para una app:

description "Example"
start on runlevel [2345]
stop on runlevel [!2345]
respawn
chdir /usr/local/share/rack/example
exec unicorn -c /etc/unicorn.conf.rb


Ahora en vez de usar /etc/inid.d/demonio start|stop|...
o en vez de usar service demonio start|stop|...

Se hace mediante los comandos: start, stop, status
$ status mysql
# stop mysql
# start mysql

En realidad todos son enlaces blandos a:
/sbin/initctl

initctl list
  mostrar estado de todos los servicios
  solo muestra los de upstart, no los lsb


Deshabilitar servicio al inicio:
http://upstart.ubuntu.com/cookbook/#disabling-a-job-from-automatically-starting

echo "manual" >> /etc/init/nombre-del-servicio.override

Log:
/var/log/upstart

