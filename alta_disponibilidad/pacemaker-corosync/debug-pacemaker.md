# http://clusterlabs.org/wiki/Debugging_Resource_Failures

Posibles errores en la configuración:
# crm_verify -L

Para probar posibles fallos, intentar arrancar el servicio manualmente:

1. Desactivar el pacemaker
# crm resource unmanage <resource>

2. crm configure show <resource>
Configurar dichos parámetros manualmente (es necesario):
# export OCF_ROOT=/usr/lib/ocf
# export OCF_RESKEY_<param>=<value>
...

3. Run the script:
# /usr/lib/ocf/resource.d/heartbeat/<RA> start ; echo $?
# /etc/init.d/<ra> start; echo $?

Mas debug:
# /etc/init.d/<ra> stop
# bash -x /etc/init.d/<ra> start; echo $?

Si queremos ejecutar un script ocf, tenemos que buscarlo en /usr/lib/ocf/resource.d/
Si lo intentamos ejecutar nosotros, nos dirá que le faltan muchas variables de entorno.
Para obtener estas variables podemos poner en la segunda linea del script
env >& /tmp/vars-ocf
Y hacer que pacemaker ejecute el script una vez más.

Una variable que siempre hace falta: OCF_ROOT=/usr/lib/ocf


Variables con las que se ejecuta un recurso se pueden ver en /proc/<PID>/environ


Tracear los Resource Agents:
trace
http://www.nongnu.org/crmsh/crm.8.html
