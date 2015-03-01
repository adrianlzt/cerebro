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

  Ejemplo:
    primitive tomcat_ESJC-DSMM-VP04P ocf:heartbeat:tomcat \
        params java_home="/usr/java/jre1.7.0_25/" catalina_home="/opt/apache-tomcat-7.0.37" catalina_base="/opt/apache-tomcat-7.0.37" tomcat_user="tomcat" catalina_opts="-Xms1024m -Xmx2048m -XX:MaxPermSize=512m" \
        op monitor interval="30s" \
        op start interval="0" timeout="60s" \
        op stop interval="0" timeout="120s" \
        meta target-role="Started" is-managed="true"
    export OCF_RESKEY_java_home="/usr/java/jre1.7.0_25/"
    export OCF_RESKEY_catalina_home="/opt/apache-tomcat-7.0.37"
    ...


3. Run the script:
# /usr/lib/ocf/resource.d/heartbeat/<RA> start ; echo $?
# /etc/init.d/<ra> start; echo $?

Mas debug:
# /etc/init.d/<ra> stop
# bash -x /etc/init.d/<ra> start; echo $?


## Forma sencilla de ejecutar un script de ocf ##
Si queremos ejecutar un script ocf, tenemos que buscarlo en /usr/lib/ocf/resource.d/
Si lo intentamos ejecutar nosotros, nos dirá que le faltan muchas variables de entorno.
Para obtener estas variables podemos poner en la segunda linea del script
env >& /tmp/vars-ocf
Y hacer que pacemaker ejecute el script una vez más.

Luego, al final de /tmp/vars-ocf ponemos el script:
/usr/lib/ocf/resource.d/heartbeat/tomcat status

Si queremos más info
bash -x /usr/lib/ocf/resource.d/heartbeat/tomcat status

Borramos el colors (da problemas)
A lo mejor tenemos que meter entre comillas algunas variables (para tomcat OCF_RESKEY_catalina_opts)

chmod a+x /tmp/vars-ocf
/tmp/vars-ocf


También podemos auditar el script para ver quien lo ejecuta y que devuelve:
auditctl -w /usr/lib/ocf/resource.d/heartbeat/tomcat -p rwxa -k tomcat


Variables con las que se ejecuta un recurso se pueden ver en /proc/<PID>/environ


Tracear los Resource Agents:
trace
http://www.nongnu.org/crmsh/crm.8.html




## Debug Pacemaker ##
Mirar en /etc/sysconfig/pacemaker
PCMK_debug
No consigo que haga caso de esas variables.


# Arranque a mano

