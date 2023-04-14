Servidor de aplicaciones

# Desplegar .war
Ejemplo: https://docs.wavefront.com/tomcat.html#step-2-install-the-jolokia-agent-on-your-tomcat-server

Copy the jolokia.war file to ${TOMCAT_HOME}/webapps.
Start or restart your Tomcat server.
Verify the Jolokia agent installation by accessing this URL: http://<address>:<port>/jolokia/

# Monitorización
https://tomcat.apache.org/tomcat-7.0-doc/monitoring.html

## Jolokia
https://docs.wavefront.com/tomcat.html

## JMX remote
Si queremos obtener métricas desde fuera.

Si queremos configurar auth:
-Dcom.sun.management.jmxremote.authenticate=true
-Dcom.sun.management.jmxremote.password.file=../conf/jmxremote.password
-Dcom.sun.management.jmxremote.access.file=../conf/jmxremote.access

jmxremote.access
monitorRole readonly
controlRole readwrite


jmxremote.password
monitorRole tomcat
controlRole tomcat

Será usuario "monitorRole", o "controlRole", y password "tomcat".
