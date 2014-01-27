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
