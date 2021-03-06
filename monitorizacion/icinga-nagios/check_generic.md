http://www.my-plugin.de/wiki/projects/check_generic/start

check_generic is the Nagios plugin you always needed but never wrote 

It executes any command (line) and compares the output against arbitrary numerical or string expressions. Allowed is everything known from perl. Also performance data can be gathered using check_generic.

Si lo ejecutamos en la shell, y usamos variables, tenemos que escaparlas (\$VAR) para que la shell no intente resolverlas.
Pero al meterla a ejecutarse en cyclops o nrpe no hace falta escaparlas.

Ejemplos:
http://my-plugin.de/wiki/projects/check_generic/examples/linux#linux

check_generic -n nagios_service_latency -e "/usr/local/nagios/bin/nagiostats -m -d AVGACTSVCLAT" -c ">60000" -w ">500"

check_generic -n "proc_meminfo_memfree" -e "grep -i memfree /proc/meminfo | awk '{print \$2}'" -w '<5000' -c '<2000' -p "free_KB"


CUIDADO! con check_generic si le metemos dentro check_procs con -a, porque podrá pillar la ejecucción del propio check como proceso buscado.



Ejemplo:
/usr/lib64/nagios/plugins/check_generic.pl -n "backlog_queue" -e "MAX=$(cat /proc/sys/net/core/somaxconn); CPUNUM=$(cat /proc/cpuinfo | grep processor | wc -l); NUM=$(/usr/sbin/ss -x state SYN-SENT | grep cyclops-alarmer | wc -l); awk \"BEGIN {print 100*\$NUM/\$MAX/\$CPUNUM/2 }\"" -w '>50' -c '>80' -p "backlog_queue"

Comprueba que el porcentaje de
(NUM)/(2*CPUNUM*MAX) no sea superior al 50% (warn) y 80% (crit)
Nos da perfdata (-p)


Devuelve OK si $HOSTNAME y $MASTER son iguales.
Critical si no son iguales
/usr/lib64/nagios/plugins/check_generic.pl -n "icinga_pacemaker" -e "MASTER=$(pcs status | grep icinga | awk '{print $4;}'); HOSTNAME=$(hostname -s); test \$MASTER = \$HOSTNAME; echo \$?" -o 'eq "0"'


Si MASTER (nodo actual donde corre icinga) y HOSTNAME son iguales, ejecuta el check_procs, si no, mensaje de que no es en este nodo.
Nos saca la linea del check_procs.
Si no es el nodo activo, chequea que no haya ningun proceso corriendo:
/usr/lib64/nagios/plugins/check_generic.pl -n "icinga_pacemaker" -e "MASTER=$(pcs status | egrep '\sIcinga\s' | awk '{print $4;}'); HOSTNAME=$(hostname -s); if [[ \$MASTER = \$HOSTNAME ]]; then /usr/lib64/nagios/plugins/check_procs -C icinga -c 1:1; else /usr/lib64/nagios/plugins/check_procs -C icinga -c 0:0 ; fi" -o '=~/(.*OK.*)/' --print_match --ignore_rc


Chequear estado de un fichero
/usr/lib64/nagios/plugins/check_generic.pl -e 'stat -c"%a-%U-%G" /etc/passwd' -o "=~/^644-root-root$/"

Chequear si un fichero ha sido modificado hace más de.
En este ejemplo, el check salta a critical si hace más de 35' que no se modifica.
/usr/lib64/nagios/plugins/check_generic.pl -e 'echo $(($(date +%s)-$(stat -c "%Y" /srv/nagios/check_mk/etc/dsmc-dcip-jobs.json)))' -c "> 2100"



Chequear dos veces un proceso esperando 5s (no se porque, pero si el if no funciona):
/usr/lib64/nagios/plugins/check_generic.pl -n "test_icinga_pacemaker" -e "if [[ 1 ]]; then OUTPUT=\$(/usr/lib64/nagios/plugins/check_procs -C top -c 1:1) && echo \$OUTPUT || (sleep 5 && /usr/lib64/nagios/plugins/check_procs -C top -c 1:1) ; fi" -o '=~/(.*OK.*)/' --print_match --ignore_rc -d /var/tmp/prueba


Comprobar diferencias entre valores (delta):
Si queremos ver como evoluciona un valor podemos usar --type delta
Ejemplo:
/usr/lib64/nagios/plugins/check_generic.pl --type delta -e "cat /sys/class/net/eth1/carrier_changes" -c '> 0.1'

La primera vez que se ejecuta genera un fichero en /var/tmp/check_generic con el timestamp y el valor leído.
En la siguiente ejecucción se resta el valor antiguo al nuevo y se divide entre los segundos pasados. Este valor se compara con el que hayamos pasado como threshold


/usr/lib64/nagios/plugins/check_generic.pl -e "mysql -h 127.0.0.1 -u icinga -pxxx -sse 'SELECT test FROM galera_check.test;'" --match_stderr -i --empty_output_is_ok -o 'eq 1' --print_match
Ejecutamos una query SQL y queremos que sea OK solo si la respuesta es "1".
En caso de error del comando debe devolver CRITICAL
