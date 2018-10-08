https://jolokia.org/

Expone JMX a través de HTTP+JSON

Creo que se tiene que desplegar junto con el .war que estemos ejecutando, como una libreria añadida.

# Proxy mode
https://jolokia.org/features/proxy.html
Despliegue de jolokia en una JVM diferente (o en la misma, pero no configurado "sobre" nuestra app).
Nos expone la api HTTP/JSON, le realizamos peticiones diciendole donde debe conectarse y que información obtener.
El se encarga de conectarse a donde le hayamos dicho, traduciendo el JSON en JMX.


 Please note that the proxy mode is not switched on by default since version 1.5.0. You have to explicitly switch it on for the WAR or OSGI agent:

-  Repackaging the jolokia.war and adapt web.xml to include the init option dispatcherClasses with a value org.jolokia.jsr160.Jsr160RequestDispatcher.
-  Set the system property org.jolokia.jsr160ProxyEnabled
- Set the environment variable JOLOKIA_JSR160_PROXY_ENABLED


# Install
## JBoss
Desplegar el jolokia-war-unsecured.war desde la interfaz de web management.
