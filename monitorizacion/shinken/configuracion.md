/usr/local/shinken/etc/

The schedulers, pollers, reactionners and brokers daemons need to know in which directory to work on, and on which TCP port to listen. That's all.
If you plan on using the default directories, user (shinken) and tcp port you shouldn't have to edit these files.


brokerd.ini  pollerd.ini  reactionnerd.ini  receiverd.ini  schedulerd.ini

host: IP interface to listen on. The default 0.0.0.0 means all interfaces
idontcareaboutsecurity: if set to 1, you can run it under the root account. But seriously: do not to this. The default is 0 of course.
daemon_enabled : if set to 0, the daemon won't run. Useful for distributed setups where you only need a poller for example.
use_local_log=1 : Log all messages that match the log_level for this daemon in a local directory
local_log=brokerd.log : name of the log file where to save the logs
log_level=INFO : Log_level that will be permitted to be logger. Warning permits Warning, Error, Critical to be logged. INFO by default.
max_queue_size=100000 : If a module got a brok queue() higher than this value, it will be killed and restarted. Put to 0 to disable it



The global configuration file is: /usr/local/shinken/etc/shinken-specific.cfg
Aqui es donde deben estar declarados todos los demonios.

En este fichero se declara un objeto por cada demonio, y se determina los parámetros de red, y si es un spare, realm y modulos.
También habrá parámetros específicos de cada demonio.

arbiter -> hostname para entornos de HA
pollers -> tags que maneja (como los hostgroups que trabaja cada gearman slave)

El broker y el scheduler pueden también cargar módulos.

Si olvidamos de definir un demonio en el fichero de configuración global, shinken lo creará automáticamente con la configuración por defecto.

Borrar de shinken-specific.cfg los módulos que no utilicemos.

