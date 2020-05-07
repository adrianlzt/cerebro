https://skydive.network/
https://fosdem.org/2020/schedule/event/real_time_network_topology_and_protocols_analyzer/

Network discovery and visualization
Tiene agentes recogiendo datos, generando grafos de relacciones y enviándolos al analizador para agrupar esos grafos.
También puede hacer captura de paquetes, solicitándolo desde la UI.
También se pueden inyectar paquetes.

Se puede definir también alertado
Workflows, en javascript: quiero capturar, luego hacer no se que, luego tal

Tiene un plugin para collectd, para coger toda su info e insertarla en skydive


probe -> agent -> analyzer

El agent y el analyzer con el mismo binario, skydive.
Probes parece que son los distintos mecanismos que tiene el agente para recolectar información: netlink, routing tablas, docker, k8s, openstack neutron, etc

Que es "seed"? Viene en el mismo binario
Add new seed mechanism to start a probe inside a container/process namespace


Es una graph db pub/sub. Podemos subscribirnos con nuestros agentes y enviar info.
Duda, como distingue si es un agente custom que se ha desconectado y está arracando y enviando la info por primera vez? uids?


## Docker
Usando docker-compose para tener un pack entero (skydive + backend/elasticsearch + agente
curl -o docker-compose.yml https://raw.githubusercontent.com/skydive-project/skydive/master/contrib/docker/docker-compose.yml
docker-compose up

UI en http://ip:8082
Junio'2020 viene con la UI antigua.
Si queremos la nueva arrancarla nosotros: https://github.com/skydive-project/graffiti-ui


## Agente
curl -Lo - https://github.com/skydive-project/skydive-binaries/raw/jenkins-builds/skydive-latest.gz | gzip -d > skydive && chmod +x skydive

Para ejecutarlo con lo que trae por defecto, especificando la ip de un analyzer:
SKYDIVE_ANALYZERS=172.16.0.124:8082 ./skydive agent


Ejemplo de config min:
analyzers:
  - 172.16.0.124:8082
agent:
  topology:
    probes:
      - blockdev
      - socketinfo
      # - docker

No me queda claro como desactivar las probes de flow

./skydive agent -c skydive.yml


Config completa: https://github.com/skydive-project/skydive/blob/master/etc/skydive.yml.default
Me parece un poco jaleo, porque tiene mezclada la config del agente, del server, etc



### Probes
https://github.com/skydive-project/skydive/tree/master/topology/probes

Los distintos métodos que tienen de recolectar información

Las probes tienen que cumplir una interface:
type Handler interface {
  Start() error
  Stop()
}

Parece que se registran con un formato parecido a telegraf.
Cada probe tiene que tener la función:
func NewProbe(ctx tp.Context, bundle *probe.Bundle) (probe.Handler, error)

https://github.com/skydive-project/skydive/blob/master/agent/topology_probes.go#L48

Ejemplo básico de probes:
https://github.com/skydive-project/skydive-plugins/pull/1/files

Parece que se pueden añadir como plugins
https://github.com/skydive-project/skydive/issues/2209


#### blockdev
Por debajo lanza
/usr/bin/lsblk -pO --json

Que parece que require una versión más o menos reciente. En RHEL7.6 no está
Parece que en la 2.27
https://git.devuan.org/CenturionDan/util-linux/commit/4a102a4871fdb415f4de5af9ffb7a2fb8926b5d1


#### socketinfo
Metadatos, lo que sería "ss -lntpu", pero no parece que me genere nodos.
No se si al conectar otro nodo que enganche me creará alguna conex

Y que diferencia hay con netlink?



# Graffiti
https://fosdem.org/2020/schedule/event/graph_graffiti/
Base de datos de grafos que funciona como backend

Ejemplo en python para comunicarse con la graffiti:
https://github.com/skydive-project/skydive/blob/master/contrib/python/api/samples/fs-watcher.py

## Schema / topology
Por debajo se almacena como una serie de Nodes y Edges.
Podemos hacer un dump de la topología:
curl -o /tmp/skydive.json http://localhost:8082/api/topology

Y también subir un dump (con la cli que se instala con python)
skydive-ws-client --analyzer localhost:8082 --username admin --password password  add /tmp/skydive.dump

Podemos meter en el dump (json) nodos nuevos, inventándonos un ID, para insetarlo en la topología.



## API
http://skydive.network/swagger/

### Topology
Lanzar una query gremlin sobre la topología:
curl 10.20.20.151:8082/api/topology -H "Accept: application/json" -H "Content-Type: application/json" -d '{"GremlinQuery": "G.V().Has(\"Name\", \"TOR3\")"}' | jq

### Python
http://skydive.network/documentation/api-python

Tanto para solicitar cosas (API REST) como para modificar o recibir cambios del grafo, via websockets

pip install skydive-client

from skydive.rest.client import RESTClient
restclient = RESTClient("10.20.20.151:8082")
nodes = restclient.lookup_nodes("G.V().Has('Name', 'TOR3')")
nodes[0].metadata




## Graffiti UI
https://github.com/skydive-project/graffiti-ui
Basada en ReactJS

docker run -p 8080:8080 skydive/skydive-ui
