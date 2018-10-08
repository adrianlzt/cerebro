Servidor de aplicaciones

Montar una imagen con docker:
docker run -p 8080:8080 -p 9990:9990 --rm -it jboss/wildfly /opt/jboss/wildfly/bin/standalone.sh -bmanagement 0.0.0.0

Wildfly es el nombre de JBoss desde 2014, aunque parece que la gente le sigue llamando JBoss.
No me queda muy claro porque en las imagenes de docker hay algunos jboss que no son wildfly?

Configuración, puede encontrarse en: /opt/jboss/jboss-eap-6.4/domain/configuration
No tengo claro que siempre tenga que ser ahí o que esa sea la única fuente de datos.


# Puertos
https://access.redhat.com/documentation/en-us/jboss_enterprise_application_platform/6/html/installation_guide/network_ports_used_by_jboss_enterprise_application_platform_62<Paste>
Cuando tenemos varios servidores corriendo dentro de jboss, cada uno tendrá un puerto distinto.
El puerto será el socket binding group + port offset

Ejemplo de config de puertos base para diferente protocolos:
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



# Monitorización
Se usa a API de management
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
