Servidor de aplicaciones

# Monitorización
https://tomcat.apache.org/tomcat-7.0-doc/monitoring.html

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
