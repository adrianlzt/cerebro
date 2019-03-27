Servidor de aplicaciones

Ejemplo de app ear: https://publib.boulder.ibm.com/bpcsamp/gettingStarted/helloWorld/download.html


JBoss EAP: version de jboss de RedHat de pago.
JBoss AS: version community
Downloads gratuitos (developers): https://developers.redhat.com/products/eap/download/

JBoss EAP 6.4.0.GA equivale a AS 7.5.0

Mapeo entre versiones: https://access.redhat.com/solutions/21906
EAP  Wildly
7.2  14
7.1  11
7.0  10

EAP JBoss AS
6.4  7.5
6.3  7.4
6.2  7.3
6.1  7.2
6.0  7.1.2


Standalone: un servidor de jboss único
Domain: gestion de configuración centralizada. Desplegamos en un sitio y se distribuye a todas las máquinas (hosts) del dominio (cluster)
  Cada domain puede tener varios servergroups. Cada servergroup puede tener varios servers
  Los despliegues los hacemos sobre servergroups. No me queda muy claro luego asigna una app a uno de los servers del grupo.
  En Domain -> Topology podemos ver que servergroups tenemos y que servers (cada server tendrá un offset de los puertos donde pondremos conectar)

Cuando desplegamos varias apps sobre el mismo server tendremos distintas URIs para cada una (eg.: http://server/miapp1 /miapp2, etc)


Montar un docker con JBoss EAP 6.4:
https://servicesblog.redhat.com/2016/03/28/starting-with-devops-deploying-applications-on-your-docker-jboss-eap-image/
Bajar el .zip de los downloads gratuitos

Montar una imagen con docker:
docker run -p 8080:8080 -p 9990:9990 --rm -it jboss/wildfly /opt/jboss/wildfly/bin/standalone.sh -bmanagement 0.0.0.0

Wildfly es el nombre de JBoss desde 2014, aunque parece que la gente le sigue llamando JBoss.
Creo que Wildfly es la versión community. JBoss EAP es la de redhat comercial.
No me queda muy claro porque en las imagenes de docker hay algunos jboss que no son wildfly?

Configuración, puede encontrarse en: /opt/jboss/jboss-eap-6.4/domain/configuration
No tengo claro que siempre tenga que ser ahí o que esa sea la única fuente de datos.


# Install
yum install -y java-1.6.0-openjdk.x86_64
Copiar el .zip y descomprimirlo


# Usuarios
Crear un user admin antes de arrancar.
bin/add-user.sh NOMBRE PASSWORD
Se crean en:
  /mnt/jboss-eap-6.4/domain/configuration/mgmt-users.properties
  /mnt/jboss-eap-6.4/standalone/configuration/mgmt-users.properties

bin/add-user.sh -a user pass
  para ApplicationRealm

Existen usuarios de management y usuarios de aplicación. Si ejecutamos el script sin parametros nos preguntará cual queremos crear y tambien si lo queremos meter en algún grupo.

Luego tenemos unos ficheros de roles que asocian usuarios a servidores: application-roles.properties


# Ejecutar
## Standalone
Config en bin/standalone.conf
Si queremos que escuche en todas las interfaces añadiremos al final:
JAVA_OPTS="$JAVA_OPTS -Djboss.bind.address=0.0.0.0 -Djboss.bind.address.management=0.0.0.0"

Para arrancarlo:
bin/standalone.sh -c standalone-full-ha.xml
  el fichero será relativo al path de configuración (vamos, que el comando es asi, sin el path completo)

Consola en
http://127.0.0.1:8080/console

## Domain
Para arrancarlo:
bin/domain.sh -c domain.xml

Para que escuche en 0.0.0.0:
bin/domain.sh -c domain.xml -Djboss.bind.address=0.0.0.0 -Djboss.bind.address.management=0.0.0.0
  la de management es para que el puerto 9990 (admin console) y 9999 (JMX domain) escuchen en 0.0.0.0

Consola en
http://127.0.0.1:9990/

Ese puerto podría haber sido modificado. Podemos ver que puertos tiene abierto el java "-D[Host Controller]" o mirar el domain.xml, buscando:
<socket interface="management" port="${jboss.management.http.port:9090}"/>


# Desplegar
En la pestaña "Deployments" de la interfaz web de mgmt, elegir la aplicación .war que desplegar y ponerla a enable.
Si elegimos el deployment y luego web, podemos ver abajo el "Context root", la uri donde tendremos la app.
Entraremos en http://localhost:8080/NOMBRECONTEXTROOT

Si estamos en modo domain, pestaña Deployments > Server Groups > Seleccionar el grupo > Seleccionar la app > Web > Context Root

Si la app no se despliega bien puede que al seleccionarla en "Server Groups", no nos muestre la sección "Web"

Propiedades:
En la parte de abajo de la web, Tools -> Management Model
Ir a deployment -> nombredelwar -> subsystem -> web -> Pestaña Data
En "Context root" podremos ver la uri que se le ha asignado.


## Ejemplo
HelloWorld: https://github.com/imago-storm/hello-world-ear/blob/master/EnterpriseHelloWorld.ear

App de ejemplo: http://www.jboss.org/ticket-monster
Descargar y hacer el build con:
mvn clean package

Subir el .war a Jboss para desplegarla.




# Puertos
https://access.redhat.com/documentation/en-us/jboss_enterprise_application_platform/6/html/installation_guide/network_ports_used_by_jboss_enterprise_application_platform_62<Paste>
Cuando tenemos varios servidores corriendo dentro de jboss, cada uno tendrá un puerto distinto.
El puerto será el socket binding group + port offset

Ejemplo de config de puertos base para diferente protocolos:
<socket-binding-groups>
 <socket-binding name="ajp" port="8000"/>
 <socket-binding name="http" port="8200"/>
 <socket-binding name="https" port="8400"/>
 <socket-binding name="remoting" port="8600"/>

Ejemplo de config de un server:
<server-group name="GRP_jolokia" profile="jolokia">
  <socket-binding-group ref="standard-sockets-c4" port-offset="89"/>

Este server tendrá asignados los puertos (en este caso https no está activado parece):
8089 -> ajp
8289 -> http
8689 -> remoting (para conectar con JMX, habrá que conectar con usuarios de aplicación, NO de management)



El puerto por defecto de JMX es el 9999 (para el controller, conectar con user de management)
/opt/jboss/jboss-eap-6.4/domain/configuration/host.xml-        <management-interfaces>
/opt/jboss/jboss-eap-6.4/domain/configuration/host.xml-            <native-interface security-realm="ManagementRealm">
/opt/jboss/jboss-eap-6.4/domain/configuration/host.xml:                <socket interface="management" port="${jboss.management.native.port:9999}"/>



# CLI
cd /opt/jboss/jboss-eap-6/bin/
./jboss-cli.sh

Se puede sacar en JSON en la versión 7.2 EAP
https://access.redhat.com/solutions/3486201
jboss-cli.sh --output-json

Usar "help" y TAB para ir navegando

Listar hosts:
:read-children-names(child-type=host)
./jboss-cli.sh --connect ":read-children-names(child-type=host)"

./jboss-cli.sh --connect --user=USER --password='PASS' --controller=10.1.7.4 ":read-children-names(child-type=host)"

Si da un error de duplicate argument, revisar que estamos poniendo bien los parametros


Listar servers en un host:
/host=local:read-children-names(child-type=server-config)

Info de un server:
/host=local/server-config=server-one:read-resource(include-runtime=true)

Arrancar/parar servers: https://docs.jboss.org/author/pages/viewpage.action?pageId=8094240
/host=local/server-config=server-one:stop
/host=local/server-config=server-one:start
/host=local/server-config=server-one:kill
/host=local/server-config=server-one:destroy

Sacar un deploy de un grupo:
/server-group=GRP_jolokia/deployment=jolokia.war:remove

Quitar un deployment:
/deployment=jolokia.war:remove





Configurar access-log para un server en modo domain:
/profile=XXX/subsystem=web/virtual-server=default-host/configuration=access-log:add
/profile=XXX/subsystem=web/virtual-server=default-host/configuration=access-log:write-attribute(name="pattern",value="%h %l %u %t \"%r\" %s %b %S %T")

Obtener información del estado de los hosts/servidores/subsistemas/connectores:
/host=master/server=server-one/deployment=ticket-monster.war/subsystem=web/servlet=org.jboss.examples.ticketmonster.rest.JaxRsActivator/:read-attribute(name=requestCount)
  número de peticiones a una app en concreto corriendo en un server
/host=master/server=server-three/subsystem=web/connector=http:read-resource
  todos los datos del conector http/web del server-three

/host=master/server-config=server-three:read-attribute(name=socket-binding-port-offset)
  offset de los puertos de un servidor


# Monitorización

Explicación métricas:
https://access.redhat.com/documentation/en-us/red_hat_jboss_operations_network/3.2/html/complete_resource_reference/jbossas7-jbossas7_host_controller-host
https://docs.bmc.com/docs/PATROL4JBossAS/32/collection-count-collectioncount-662397002.html

## Usando API management
https://docs.jboss.org/author/display/AS71/The+HTTP+management+API

Como hemos arrancado el server (domain o standalone):
curl --digest -L -D - http://localhost:9990/management --header "Content-Type: application/json" -d '{"operation":"read-attribute","name":"launch-type","json.pretty":1}' -u admin:pass

Obtener estado del server (creo que solo vale si hemos arrancado en standalone):
curl --digest -L -D - http://localhost:9990/management --header "Content-Type: application/json" -d '{"operation":"read-attribute","name":"server-state","json.pretty":1}' -u admin:pass

Para domain debería ser algo tipo (creo que para conocer el host y server deberemos pedir primero las queries siguientes):
{"operation":"read-attribute","address":[{"host":"master"},{"server":"server-01"}],"name":"server-state","json.pretty":1}

Server groups:
{"operation":"read-children-names","child-type":"server-group","json.pretty":1}

Hosts:
{"operation":"read-children-names","child-type":"host","jso.pretty":1}



## Usando JMX
https://access.redhat.com/solutions/149973
https://developer.jboss.org/wiki/UsingJconsoleToConnectToJMXOnAS7
https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.1/html/performance_tuning_guide/monitoring_performance
  para configurar un jboss domain para poder acceder por jmx a todos los servers
  mirar más abajo para más info

Usar el jconsole que viene con jboss (en bin/). Lo que hace ese script es cargar unas librerias de jboss necesarias.
Mirar más abajo para ver como lanzarlo

Mejor usar VisualVM (también abajo como configurarlo)


Modo standalone y domain
service:jmx:remoting-jmx://172.17.0.2:9999
Poner user y pass

JBoss EAP 5 supports JMX monitoring using RMI, where JBoss EAP 6 does not. EAP 6 uses "remoting-jmx" instead of "rmi"
JBoss EAP 6 does not use RMI
https://access.redhat.com/solutions/308643

Para conectar con jconsole usar el script que viene en la distribución (bin/jconsole.sh)
https://dzone.com/articles/remote-jmx-access-wildfly-or
Básicamente hará esto:
export JBOSS_HOME=/home/adrian/Documentos/opensolutions/carrefour/repos/ansible-role-jboss-monitor/pruebas/jboss-eap-6.4
/usr/lib/jvm/default/bin/jconsole -J-Djava.class.path=/usr/lib/jvm/default/lib/jconsole.jar:/usr/lib/jvm/default/lib/tools.jar:/home/adrian/Documentos/opensolutions/carrefour/repos/ansible-role-jboss-monitor/pruebas/jboss-eap-6.4/bin/client/jboss-cli-client.jar -J-Dmodule.path=/home/adrian/Documentos/opensolutions/carrefour/repos/ansible-role-jboss-monitor/pruebas/jboss-eap-6.4/modules


VisualVM
Una vez instalado, copiar este script (en este dir: visualvm.sh o en https://gist.github.com/b4b19c2336806c6e1d91fb3f07a81864) en el bin/ del dir de jboss para poder arrancarlo.


Para conectar con el JMX del controlador del dominio lo haremos con un usuario de management por el puerto 9999.
Obtendremos MBeans generales: cpu, memoria, threads, classes, etc
JConsole en este modo también nos permitirá interactuar con la jboss cli.

Si queremos conectar a cada uno de los servidores corriendo bajo el dominio, tendremos que usar su puerto de remoting, conectando con un usario de aplicación
Aqui veremos todos los MBeans de jboss (jboss.as, jboss.jta, etc)



### Problemas con JMX
Abrir wireshark en el puerto que intentamos conectar.
Tras la apertura del puerto TCP tendremos que ver que el servidor nos envia su hostname.
Luego se intercambian mensajes para la autorización.
Veremos algo tipo "...JBOSS-LOCAL-USER DIGEST-MD5..."
realm="ApplicationRealm",nonce=...  <- esto si estamos conectando a un remote de un servidor, no al controller. Para el controller pondrá "ManagementRealm"


Si intentamos conectar contra un remoting sin haber configurado:
<subsystem xmlns="urn:jboss:domain:jmx:1.3">
  <expose-resolved-model/>
  <expose-expression-model/>
  <remoting-connector use-management-endpoint="false"/>
</subsystem>
Nos nos permitirá conectar. Al inicio de la conex veremos en los paquetes que se identificará, tipo "master:nombreserver JBOSS-LOCAL-USER"
Y unos paquetes más adelante nos dirá: Unkown service name


Si queremos ver si un server tiene la config adecuada:
  1. Primero obtenemos el profile que está usando: /host=master/server=server-one/:read-attribute(name=profile-name)
  2. Luego obtenemos la config del profile a este respecto: /profile=full/subsystem=jmx/:read-resource(recursive-depth=0)
  3. Miramos la key "remoting-connector". Si está undefined es que no tenemos la config hecha. Si pone '"remoting-connector" => {"jmx" => undefined}' estará correctamente configurado.

Podemos cambiar esa config con la cli usando el comando (no hace falta reinciar nada):
/profile=full/subsystem=jmx/remoting-connector=jmx:add(use-management-endpoint=false)

Explicación de este parámetro:
Set the remoting-connector in the jmx subsystem to not use the management endpoint. In domain mode only the host controller has a management port, the individual servers do not. So that's why we set use-management-endpoint=false implying using the remote endpoint instead if you want to connect to the individual servers.
When running in Domain mode the main difference is that individual servers do not have a management port. Only the Host Controller exposes a management port. Therefore we need to set the remoting-connector in the jmx subsystem to not use the management endpoint.

También podría ser que faltase el puerto en el socket-binding-group o no tener activado el acceso para ApplicationRealm en el subsystem remoting.
