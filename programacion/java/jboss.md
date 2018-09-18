Servidor de aplicaciones

Montar una imagen con docker:
docker run -p 8080:8080 -p 9990:9990 --rm -it jboss/wildfly /opt/jboss/wildfly/bin/standalone.sh -bmanagement 0.0.0.0

Wildfly es el nombre de JBoss desde 2014, aunque parece que la gente le sigue llamando JBoss.
No me queda muy claro porque en las imagenes de docker hay algunos jboss que no son wildfly?


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
