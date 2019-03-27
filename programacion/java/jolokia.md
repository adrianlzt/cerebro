https://jolokia.org/

Expone JMX a través de HTTP+JSON

Creo que se tiene que desplegar junto con el .war que estemos ejecutando, como una libreria añadida.

# Proxy mode
https://jolokia.org/features/proxy.html
https://github.com/rhuss/jolokia/blob/master/agent/jsr160/src/main/java/org/jolokia/jsr160/Jsr160RequestDispatcher.java
Despliegue de jolokia en una JVM diferente (o en la misma, pero no configurado "sobre" nuestra app).
Nos expone la api HTTP/JSON, le realizamos peticiones diciendole donde debe conectarse y que información obtener.
El se encarga de conectarse a donde le hayamos dicho, traduciendo el JSON en JMX.


Version secured VS unsecured.
La diferencia está en el fichero WEB-INF/web.xml.
La versión unsecured tiene comentadas las secciónes:
<login-config>
<security-constraint>
<security-role>

Ese fichero podemos consultarlo en JBoss corriendo mirando en un directorio temporal que tiene que estar abierto por el proceso (el proceso no tendrá abierto el web.xml, pero veremos un directorio donde si estará ese fichero)


Please note that the proxy mode is not switched on by default since version 1.5.0. You have to explicitly switch it on for the WAR or OSGI agent:
  - Repackaging the jolokia.war and adapt web.xml to include the init option dispatcherClasses with a value org.jolokia.jsr160.Jsr160RequestDispatcher.
  - Set the system property org.jolokia.jsr160ProxyEnabled (tuve que reiniciar el server tras añadir esta opción (en Domain -> Server Groups -> System Properties)
  - Set the environment variable JOLOKIA_JSR160_PROXY_ENABLED

Podemos ver si está en modo proxy con:
curl -s 172.17.0.2:8080/jolokia-war-unsecured-1.6.0 | jq '.value.config.dispatcherClasses'
org.jolokia.http.Jsr160ProxyNotEnabledByDefaultAnymoreDispatcher -> no tenemos el proxy configurado

Si no está habilitado el proxy y enviamos un POST JSON, ej.:
curl -H "Content-Type: application/json" http://172.17.0.2:8080/jolokia-war-unsecured-1.6.0 -d '{"type":"READ", "mbean":"java.lang:type=Threading", "attribute":"ThreadCount", "target": { "url":"service:jmx:rmi:///jndi/rmi://jboss-as:8686/jmxrmi", "password":"admin", "user":"scrt" } }' | python -m json.tool |& sed "s#\\\n#\n#g"

Nos devolverá un error, muy largo, que contiene al principio: No JSR-160 proxy is enabled by default since Jolokia 1.5.0


Si no podemos conectar con el RMI remoto tendremos el error:
Failed to retrieve RMIServer


Parece que jolokia no puede hablar "remoting-jmx", que es el protocolo que sustituye RMI a partir de JBoss EAP 6
Si queremos que lo soporte tendremos que meter la libreria jboss-cli-client.jar (en el codigo de JBoss) dentro del WAR (WEB-INF/lib/jboss-cli-client.jar)


# Install
## JBoss
Desplegar el jolokia-war-unsecured.war desde la interfaz de web management.

Probar:
http://localhost:8080/jolokia-war-unsecured-1.6.0/read/java.lang:type=Memory/HeapMemoryUsage

Toda la info
curl -s 172.17.0.2:8080/jolokia-war-unsecured-1.6.0/list | jq '.' | less


### Auth
Si tenemos jolokia secured deberemos crear un user del ApplicationRealm que pertenzca al grupo "jolokia".


# Operaciones
https://jolokia.org/reference/html/protocol.html#jolokia-operations
Omitimos la key "target" para simplificar.

Obtener un valor
{"type":"READ", "mbean":"java.lang:type=Threading", "attribute":"ThreadCount"}

Buscar MBeans:
{"type":"SEARCH", "mbean":"java.lang:*"}

Listar todas las MBeans:
{"type":"LIST", "mbean":"*"}


## Jboss
Si queremos pedir datos a JBoss con el esquema que usa en la cli tendremos que poner delante "jboss.as:".
Ejemplo:
http://192.168.2.8:8080/jolokia-war-unsecured-1.6.0/read/jboss.as:subsystem=web,connector=http?ignoreErrors=true<Paste>
