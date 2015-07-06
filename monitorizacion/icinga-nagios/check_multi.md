http://www.my-plugin.de/wiki/projects/check_multi/start

# Instalación
http://www.my-plugin.de/wiki/projects/check_multi/installation

check_multi-0.26
./configure --prefix=/opt/check_multi --with-plugin_path=/usr/lib64/nagios/plugins --with-nagios-user=root --with-nagios-group=root --with-nagios-name=icinga
make all
make install
make install-contrib
  falla. Falta definir la variable HTMLDIR en check_multi-0.26/contrib/status_query/Makefile
make install-config

Modificado el binario y los path de instalación para que quede listo para RHEL.
check_multi-0.26-2.x86_64.rpm



Se ejecuta un check activo contra check_multi, que ejecuta un montón de checks definidos en un fichero de configuración.
check_multi se encarga de recoger esos valores y poner los valores en checks pasivos.


Ejemplo para ejecutar dos checks, configurado con nrpe:
command[check_multi_tcpout]=/usr/lib64/nagios/plugins/check_multi -f /tmp/fichero.cmd

/tmp/fichero.cmd
command[check_code.google.com]=/usr/lib64/nagios/plugins/check_http -H code.google.comm
command[check_developers.google.com]=/usr/lib64/nagios/plugins/check_http -H developers.google.com


http://www.my-plugin.de/wiki/projects/check_multi/configuration/file#state_-_state_definition
Para definir que estado se devuelve se analiza en este orden: OK → UNKNOWN → WARNING → CRITICAL
Esto quiere decir que si CRITICAL está activo, al tener la mayor precedencia, será el código que aparecerá.
Si están activos el estado OK y el estado WARNING, aparecerá el warning.

Para decidir que estados se encuentran activos se definen "state".
Ejemplo: Clustering: only rise critical if more than one CRITICAL state encountered, otherwise raise WARNING:
state [ WARNING  ] = COUNT(WARNING) > 0 || COUNT(CRITICAL) > 0
state [ CRITICAL ] = COUNT(CRITICAL) > 1


Se puede usar para enviar checks pasivos. Mirar pasivos.md


Para ejecutar todos los /tmp/*.cmd
/usr/lib64/nagios/plugins/check_multi -f /tmp/


# Ejecutar todos los comandos definidos para nrpe
/usr/lib64/nagios/plugins/check_multi -f /etc/nrpe.d -s file_extension=cfg

# Inline
Comprobar la hora contra dos servidores NTP. Si uno es OK -> OK. Si los dos CRITICAL -> CRITICAL
Ignoramos fallo UNKNOWN.
/usr/lib64/nagios/plugins/check_multi.pl -x 'command[ntp1]=/usr/lib64/nagios/plugins/check_ntp_time -H 0.es.pool.ntp.org -c 10' -x 'command[ntp2]=/usr/lib64/nagios/plugins/check_ntp_time -H 1.europe.pool.ntp.org -c 10' -x 'state[OK]=COUNT(OK)>0' -x 'state[CRITICAL]=COUNT(OK)<1' -x 'state[UNKNOWN]=(1==0)'


Con Macros, OK si las 4 ips responden bien. Warning si alguna contesta mal. Critical si todas mal
/usr/lib64/nagios/plugins/check_multi.pl -s PORT=35357 -x 'command[vip1_ext_mgmt]=/usr/lib64/nagios/plugins/check_tcp -t 5 -H 10.0.238.131 -p $PORT$' -x 'command[vip2_ext_mgmt]=/usr/lib64/nagios/plugins/check_tcp -t 5 -H 10.0.238.132 -p $PORT$' -x 'command[vip1_om]=/usr/lib64/nagios/plugins/check_tcp -t 5 -H 192.168.0.5 -p $PORT$' -x 'command[vip2_om]=/usr/lib64/nagios/plugins/check_tcp -t 5 -H 192.168.0.6 -p $PORT$' -x 'state[OK]=COUNT(OK)>0' -x 'state[CRITICAL]=COUNT(OK)<1' -x 'state[UNKNOWN]=(1==0)' -x 'state[WARNING]=COUNT(OK)<4' 


## Timeouts ##
Hay que tener cuidado con los timeouts.
Si ejecutamos con un solo check_multi gran cantidad de comandos, y uno de ellos tarda mucho en contestar, la respuesta de todos tardará en llegar.
Podemos poner un '-t' a check_multi para determinar el tiempo máximo de espera.
Por defecto check_multi dará 11s a cada command para ejecutarse
Si salta el timeout de check_multi veremos en Icinga: "[timeout encountered after Xs]"

Si estamos enviando los datos a gearman (con send_multi), también tenemos que tener en cuenta que por defecto send_multi espera 10s antes de salir. Por lo tanto es posible que tengamos que aumentar ese valor '--timeout=x' para que sea mayor que el timeout de check_multi.
--timeout=0 espera indefinidamente


PROBLEMA, si un check tarda mucho (un check_tcp que no termina), habrá retardado a todo el grupo. Es decir, si ponemos -t 5, cada check puede tardar 5s, pero si tenemos 10 checks, con 4 mal, pues tardará unos 24s (5*4 + 3s del resto), y esto será mayor que el timeout esperado por send_multi y por check_nrpe.
La solución es que la ejecución de los checks fuese en paralelo, pero esto provocaría una carga muy gande la máquina de manera instantanea.

Este problema no es tal en checks pasivos, ya que no importa que se produzca un retraso en el envío (bueno, si fuese muy muy grande el retraso icinga podría pensarse que no estamos enviando los datos, pero sería un caso muy extremo)



# Usándolo como eventhandler automático
La idea:
 1.- chequear el estado de un servicio
 2.- Si no esta funcionando, arrancarlo
 3.- Volver a comprobar el estado
 4.- Devolver OK, WARNING o CRITICAL depende de la combinatoria anterior

http://www.my-plugin.de/wiki/projects/check_multi/examples/start_process
