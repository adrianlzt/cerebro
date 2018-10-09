https://jolokia.org/

Expone JMX a través de HTTP+JSON

Creo que se tiene que desplegar junto con el .war que estemos ejecutando, como una libreria añadida.

# Proxy mode
https://jolokia.org/features/proxy.html
Despliegue de jolokia en una JVM diferente (o en la misma, pero no configurado "sobre" nuestra app).
Nos expone la api HTTP/JSON, le realizamos peticiones diciendole donde debe conectarse y que información obtener.
El se encarga de conectarse a donde le hayamos dicho, traduciendo el JSON en JMX.


Please note that the proxy mode is not switched on by default since version 1.5.0. You have to explicitly switch it on for the WAR or OSGI agent:
  - Repackaging the jolokia.war and adapt web.xml to include the init option dispatcherClasses with a value org.jolokia.jsr160.Jsr160RequestDispatcher.
  - Set the system property org.jolokia.jsr160ProxyEnabled (tuve que reiniciar el server tras añadir esta opción (en Domain -> Server Groups -> System Properties)
  - Set the environment variable JOLOKIA_JSR160_PROXY_ENABLED

Podemos ver si está en modo proxy con:
curl -s 172.17.0.2:8080/jolokia-war-unsecured-1.6.0 | jq '.value.config.dispatcherClasses'
org.jolokia.http.Jsr160ProxyNotEnabledByDefaultAnymoreDispatcher -> no tenemos el proxy configurado

Si no está habilitado el proxy y enviamos un POST JSON, ej.:
curl -H "Content-Type: application/json" http://172.17.0.2:8080/jolokia-war-unsecured-1.6.0 -d '{"type":"READ", "mbean":"java.lang:type=Threading", "attribute":"ThreadCount", "target": { "url":"service:jmx:rmi:///jndi/rmi://jboss-as:8686/jmxrmi", "password":"admin", "user":"scrt" } }'

Nos devolverá un error, muy largo, que contiene al principio: No JSR-160 proxy is enabled by default since Jolokia 1.5.0


Si no podemos conectar con el RMI remoto tendremos el error:
Failed to retrieve RMIServer




# Install
## JBoss
Desplegar el jolokia-war-unsecured.war desde la interfaz de web management.

Probar:
http://localhost:8080/jolokia-war-unsecured-1.6.0/read/java.lang:type=Memory/HeapMemoryUsage

Toda la info
curl -s 172.17.0.2:8080/jolokia-war-unsecured-1.6.0/list | jq '.' | less
