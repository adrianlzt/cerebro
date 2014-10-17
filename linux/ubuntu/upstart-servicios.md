http://upstart.ubuntu.com/

Ahora en vez de usar /etc/inid.d/demonio start|stop|...
o en vez de usar service demonio start|stop|...

Se hace mediante los comandos: start, stop, status
$ status mysql
# stop mysql
# start mysql

En realidad todos son enlaces blandos a:
/sbin/initctl

# initctl list


Deshabilitar servicio al inicio:
http://upstart.ubuntu.com/cookbook/#disabling-a-job-from-automatically-starting

echo "manual" >> /etc/init/nombre-del-servicio.override
