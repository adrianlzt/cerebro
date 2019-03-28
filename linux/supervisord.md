http://supervisord.org/
http://supervisord.org/configuration.html#program-x-section-settings

Por ahora, Nov'2016, no funciona con Python 3.
Otra opción: http://circus.readthedocs.io/en/latest/

Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems.

It shares some of the same goals of programs like launchd, daemontools, and runit. Unlike some of these programs, it is not meant to be run as a substitute for init as “process id 1”. Instead it is meant to be used to control processes related to a project or a customer, and is meant to start like any other program at boot time.

Features:
Supervisord starts processes as its subprocesses, and can be configured to automatically restart them on a crash. It can also automatically be configured to start processes on its own invocation.
Supervisord starts processes as subprocesses, so it always knows the true up/down status of its children and can be queried conveniently for this data.
Delegation: Users who need to control process state often need only to do that
Process Groups: Processes often need to be started and stopped in groups, sometimes even in a “priority order"
Puede sacar el stdout/stderr de un proceso.

supervisorctl -c /etc/supervisor/supervisord.conf
Comandos para controlar los recursos
  status <- muestra el estado de todos los programas manejados
  start PROG
  stop PROG
  tail -f PROG <- muestra stdout del proceso
  tail PROG <- muestra las ultimas lineas del fichero de log
  tail PROG stderr <- muestra últimas lineas de stderr


## Instalacion ##
yum install supervisor
  version vieja

Usar fpm para generar un rpm a partir de pip (python-pip). Esta versión vendrá sin init.d script

Init scripts:
https://github.com/Supervisor/initscripts
Para redhat parece que el mejor es este: https://github.com/Supervisor/initscripts/blob/master/redhat-init-mingalevme


## Configuracion ##

Configuración básica:
echo_supervisord_conf > /etc/supervisord.conf

logfile=/var/log/supervisord.log

pidfile=/var/run/supervisord.pid

Al final:
[include]
files = /etc/supervisord.d/*.ini


Settings para los program:
http://supervisord.org/configuration.html#program-x-section-settings

Controlled programs should themselves not be daemons, as supervisord assumes it is responsible for daemonizing its subprocesses

autostart=true
  los programas por defecto se arrancan junto con supervisor

autorestart=unexpected/true/false
  por defecto los programas se autoreiniciarán cuando salgan con un exitcode distinto de los esperados (mirar exitcodes)
  si lo ponemos a unexpected, solo se reiniciará si sale con un código distinto de los puestos en exitcode. Pero esto tiene una excepcion
  https://github.com/Supervisor/supervisor/issues/260  si el programa termina antes de startsecs supervisord volverá a intentar arrancarlo
  tendremos que forzar startsecs=0 para que esto funcione

exitcodes=0,2
  valores por defecto

stopsignal=TERM
  señal que enviará al proceso para que pare

stopasgroup=true
  mata al proceso que haya arrancado y todos los hijos que este pueda haber creado.
  muy util cuando supervisord llama a un script en bash, el que llama a más procesos.
  si no lo ponemos, supervisord matará al script bash, pero se quedarán corriendo los otros hijos que haya ejecutado el script


## Ejemplos ##

[program:foo]
command=/bin/cat

Podemos usarlo para mantener un proceso corriendo en un container Docker.
Ejemplo: http://docs.docker.io/en/latest/examples/running_riak_service/
Ejemplo: https://github.com/justone/docker-mongodb

Dockerfile:
...
add     supervisord.conf /etc/supervisor/conf.d/supervisord.conf
cmd     ["/usr/bin/supervisord", "-n"]


[program:sshd]
command=/usr/sbin/sshd -D
stdout_logfile=/var/log/supervisor/%(program_name)s.log
stderr_logfile=/var/log/supervisor/%(program_name)s.log
# autorestart=true
# redirect_stderr = true
# para hacer 2>&1

[program:mongod]
command=/usr/bin/mongod --smallfiles
stdout_logfile=/var/log/supervisor/%(program_name)s.log
stderr_logfile=/var/log/supervisor/%(program_name)s.log

Poner el programa sin demonizar, porque si no supervisord pensará que se ha cerrado
[program:puppet]
command=/usr/bin/ruby /usr/bin/puppet master --no-daemonize


# Errores
Error: Another program is already listening on a port that one of our HTTP servers is configured to use.  Shut this program down first before starting supervisord.

http://serverfault.com/questions/114477/supervisor-http-server-port-issue
sudo unlink /tmp/supervisor.sock
sudo unlink /var/run/supervisor.sock
