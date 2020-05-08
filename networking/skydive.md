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

Tenemos que distinguir que datos son de "skydive" y cuales de "graffiti".


## Schema / topology
Por debajo se almacena como una serie de Nodes y Edges.
Podemos hacer un dump de la topología:
SKYDIVE_ANALYZERS=10.20.20.151:8082 ./skydive client topology export > graph.json

Y también subir un dump (con la cli que se instala con python)
SKYDIVE_ANALYZERS=10.20.20.151:8082 ./skydive client topology import --file graph.json





## Client
http://skydive.network/blog/topology-rules.html
Para interactuar con los analyzers, crear nodos, etc.
SKYDIVE_ANALYZERS=10.20.20.151:8082 ./skydive client status

SKYDIVE_ANALYZERS=10.20.20.151:8082 ./skydive client node-rule create --action create --description cli --name archerRule --node-name archer --node-type fabric --metadata 'foo=bar, bar=foo'

Los nodos y edges creados con "node-rule" y "edge-rule" no pertenecen a skydive.
Pero si están en la bd de graffiti



## API
http://skydive.network/swagger/
http://skydive.network/documentation/api#topologyflow-request

Podemos ver como funciona "skydive client"

Los nodos y edges creados con "node-rule" y "edge-rule" no pertenecen a skydive.
Pero si están en la bd de graffiti

Mediante websockets sí que podemos meter nodos en skydive.



### RAW / Topology
Lanzar una query gremlin sobre la topología:
curl 10.20.20.151:8082/api/topology -H "Accept: application/json" -H "Content-Type: application/json" -d '{"GremlinQuery": "G.V().Has(\"Name\", \"TOR3\")"}' | jq

Crear nodo:
POST /api/noderule
Content-Type: application/json
{"Name":"jRule","Description":"directora","Metadata":{"Foo":"bar","Name":"Jaria","Type":"people"},"Action":"create","Query":"","UUID":""}


### Python
http://skydive.network/documentation/api-python

Tanto para solicitar cosas (API REST) como para modificar o recibir cambios del grafo, via websockets

pip install skydive-client

Biene con un pequeño cliente para websockets, aunque es mejor "skydive agent"
skydive-ws-client --analyzer localhost:8082 --username admin --password password  add /tmp/skydive.dump

from skydive.rest.client import RESTClient
restclient = RESTClient("10.20.20.151:8082")
nodes = restclient.lookup_nodes("G.V().Has('Name', 'TOR3')")
nodes[0].metadata




# Graffiti UI
https://github.com/skydive-project/graffiti-ui
Basada en ReactJS

docker run -p 8080:8080 skydive/skydive-ui

Pruebas de visualización
https://github.com/skydive-project/skydive-ui/tree/master/tools/csvstoskyui

Con Alt+Click podemos mover los "rows"


## Entorno desarrollo
Clonar repo
npm install
  con node 13 me funciona. En el dockerfile usan v10
./node_modules/webpack-dev-server/bin/webpack-dev-server.js --host 0.0.0.0

## Pruebas schemas
Podemos generar un .json en assets/dump.json y visualizarlo usando la url:
http://localhost:8080/?data=/assets/dump.json

Si queremos que el server de pruebas envíe una nueva versión de este fichero tenemos que forzar un render, podemos hacerlo guardando cualquier otro fichero de código.
Y activar en el navegador "Disable cache"

Para generar ejemplos de dumps podemos usar tools/csvstoskyui


## ReactJS

src/Config.ts
donde se almacena todo el tema de como pintar los distintos nodos según sus propiedades

src/App.tsx y src/Topology.tsx agrupan prácticamente toda la lógica. Dos ficheros enormes

src/api/api.ts lib autogenerada por swagger para comunicarnos con la API rest del analyzer

La ui usa componentes de https://material-ui.com/components/

A grandes rasgos se compone de:
AppBar (con algunos botones que no se usan)
Drawer (barra lateral izquierda, escondida, no se usa)
Container (classes.content)
  Topology (custom): se le pasan muchos props
  Se encarga de generar el SVG que se muestra
Container (classes.rightPanel): donde se muestran las propiedades de los nodos
Container (classes.nodeTagsPanel): tags, para poder solo mostrar los nodos que tengan ciertos tags
  estos tags se generan a partir de la metadata, puesto en Config.ts nodeTags a fuego solo el caso de k8s
Container (classes.filtersPanel): filtrar mediante una expresion gremlin, debajo del icono de login
  solo se muestran si no estamos cargando valores estáticos (?data=/assets/dump.json)
  definidos en this.props.config.filters
  estos filtros están definidos en Config.ts: DefaultConfig.filters, son queries gremlin que se lanzan por websocket
Container (classes.linkTagsPanel): menu de abajo a la izquierda con los tipos de links y posibilidad de des/activar



### Toplogy
Parece que usa d3js para generar un SVG.
En renderTree() parece que está la función más general que llama al resto de "renderizadores"

Se usa https://github.com/d3/d3-selection para selecionar nodos y trabajar con ellos.

Para generar el "arbol", se le pasa un nodo root con los child a la funcion "tree" de d3:
https://observablehq.com/@d3/tidy-tree

#### Levels
La información se organiza en distintos levels.
Que levels hay se define en Config.tx weightTitles, asignado un peso a cada uno (como de arriba debe estar respecto al resto).
Cada nodo se le asignan unos atributos (_nodeAttrsInfra), esa función, en base a su "Metadata.Type" decide que "weight" le pone, que será en que nivel irá.

Los hijos de un nodo siempre deben estar en un weight de valor superior (debajo), si no, se pintarán igualmente debajo pero dentro del level del padre.


### Nodos
Hay una clase "Node" donde se definen las propiedades y se puede obtener su weight.

Cada "nodo" del gráfico puede tener:
  icon
  weight
  badges (iconitos que le aparecen arriba)

Las relaciones de "ownership" solo pueden ser 1:N (un hijo no puede tener varios padres), pero si podemos crear otros tipos de edges M:N (creo, he probado N:1)

El weight sirve para ordenar los distintos tipos de nodo, pero solo cuando no tienen relacion de ownership.
En caso de tener ownership, el parent siempre va arriba
