http://www.my-plugin.de/wiki/projects/check_multi/start

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


## Timeouts ##
Hay que tener cuidado con los timeouts.
Si ejecutamos con un solo check_multi gran cantidad de comandos, y uno de ellos tarda mucho en contestar, la respuesta de todos tardará en llegar.
Podemos poner un '-t' a check_multi para determinar el tiempo máximo de espera.
Si salta el timeout de check_multi veremos en Icinga: "[timeout encountered after Xs]"

Si estamos enviando los datos a gearman (con send_multi), también tenemos que tener en cuenta que por defecto send_multi espera 10s antes de salir. Por lo tanto es posible que tengamos que aumentar ese valor '--timeout=x' para que sea mayor que el timeout de check_multi.


PROBLEMA, si un check tarda mucho (un check_tcp que no termina), habrá retardado a todo el grupo. Es decir, si ponemos -t 5, cada check puede tardar 5s, pero si tenemos 10 checks, con 4 mal, pues tardará unos 24s (5*4 + 3s del resto), y esto será mayor que el timeout esperado por send_multi y por check_nrpe.
La solución es que la ejecución de los checks fuese en paralelo.
