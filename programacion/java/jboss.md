Servidor de aplicaciones

JBoss EAP: version de jboss de RedHat de pago.
JBoss AS: version community
Downloads gratuitos (developers): https://developers.redhat.com/products/eap/download/

JBoss EAP 6.4.0.GA equivale a AS 7.5.0


Standalone: un servidor de jboss único
Domain: gestion de configuración centralizada. Desplegamos en un sitio y se distribuye a todas las máquinas (hosts) del dominio (cluster)
  Cada domain puede tener varios hostgroups. Cada hostgroups puede tener varios servers
  Los despliegues los hacemos sobre hostgroups. No me queda muy claro luego asigna una app a uno de los servers del grupo.
  En Domain -> Topology podemos ver que hostgroups tenemos y que servers (cada server tendrá un offset de los puertos donde pondremos conectar)

Cuando desplegamos varias apps sobre el mismo server tendremos distintas URIs para cada una (eg.: http://server/miapp1 /miapp2, etc)


Montar un docker con JBoss EAP 6.4:
https://servicesblog.redhat.com/2016/03/28/starting-with-devops-deploying-applications-on-your-docker-jboss-eap-image/
Bajar el .zip de los downloas gratuitos

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

Existen usuarios de management y usuarios de aplicación. Si ejecutamos el script sin parametros nos preguntará cual queremos crear


# Ejecutar
## Standalone
Config en bin/standalone.conf
Si queremos que escuche en todas las interfaces añadiremos al final:
JAVA_OPTS="$JAVA_OPTS -Djboss.bind.address=0.0.0.0 -Djboss.bind.address.management=0.0.0.0"

Para arrancarlo:
bin/standalone.sh -c standalone-full-ha.xml

Consola en
http://127.0.0.1:8080/console

## Domain
Para arrancarlo:
bin/domain.sh -c domain.xml

Para que escuche en 0.0.0.0 (posiblemente sobra alguna conf):
bin/domain.sh -c domain.xml --pc-address=0.0.0.0 --master-address=0.0.0.0 -Djboss.bind.address=0.0.0.0 -Djboss.bind.address.management=0.0.0.0

Consola en
http://127.0.0.1:9990/


# Desplegar
En la pestaña "Deployments" de la interfaz web de mgmt, elegir la aplicación .war que desplegar y ponerla a enable.
Si elegimos el deployment y luego web, podemos ver abajo el "Context root", la uri donde tendremos la app.
Entraremos en http://localhost:8080/NOMBRECONTEXTROOT

Si estamos en modo domain, pestaña Deployments > Server Groups > Seleccionar el grupo > Seleccionar la app > Web > Context Root

Propiedades:
En la parte de abajo de la web, Tools -> Management Model
Ir a deployment -> nombredelwar -> subsystem -> web -> Pestaña Data
En "Context root" podremos ver la uri que se le ha asignado.


## Ejemplo
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
8689 -> remoting



El puerto por defecto de JMX es el 9999
/opt/jboss/jboss-eap-6.4/domain/configuration/host.xml-        <management-interfaces>
/opt/jboss/jboss-eap-6.4/domain/configuration/host.xml-            <native-interface security-realm="ManagementRealm">
/opt/jboss/jboss-eap-6.4/domain/configuration/host.xml:                <socket interface="management" port="${jboss.management.native.port:9999}"/>



# CLI
cd /opt/jboss/jboss-eap-6/bin/
./jboss-cli.sh

Usar "help" y TAB para ir navegando

Listar hosts:
:read-children-names(child-type=host)

Listar servers en un host:
/host=local:read-children-names(child-type=server-config)

Info de un server:
/host=local/server-config=server-one:read-resource(include-runtime=true)

Arrancar/parar servers: https://docs.jboss.org/author/pages/viewpage.action?pageId=8094240
/host=local/server-config=server-one:stop


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

Usar el jconsole que viene con jboss (en bin/). Lo que hace ese script es cargar unas librerias de jboss necesarias.
Mirar más abajo para ver como lanzarlo


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


Conectando por JConsole podemos ver ciertas MBeans que están expuestas, relativas al servidor, memoria, cpu, etc.

Si queremos acceder a los datos de JBoss tendremos que usar comandos de su CLI
Podemos conectar a la CLI con: bin/jboss-cli.sh
Tambien podemos lanzar los comandos desde la pestaña "JBoss CLI" del JConsole


Por lo que observo, si preguntamos al JMX controller, solo obtenemos MBeans generales, cpu, memoria, threads, classes, etc
