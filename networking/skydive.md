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
https://github.com/skydive-project/skydive-plugins/

Parece que se pueden añadir como plugins
https://github.com/skydive-project/skydive/issues/2209

Creo que el sistema de plugins de Go no cuadra, porque al tener que hacer el build distinto a skydive usando gomod, siempre protesta por usar ficheros distintos.

#### Añadir nuevo probe
Crear topology/probes/nombre/nombre.go

Si queremos probarlo tenemos que comitearlo, si no, el go:generate no lo detectará.

Añadir la nueva probe al fichero de config: etc/skydive.yml

Añadirla a agent/topology_probes.go
import ...
name.Register()
case "name":
  return name.NewProbe(ctx, bundle)


NewProbe() debe devolver un objeto que cumpla la interfaz Handler
  Start() error
  Stop()


Tenemos disponible también el concepto bundle, para agrupar varias probes: probe/bundle.go
Parece que nos permite arrancarlas y pararlas



Registrar un nodo (internamente crea el nodo y lo añade):
p.Ctx.Graph.NewNode

// Crear un link al root node (que como estamos en el agente, será el nodo del "server") si no lo tiene ya
if !topology.HaveOwnershipLink(p.Ctx.Graph, p.Ctx.RootNode, node) {
  topology.AddOwnershipLink(p.Ctx.Graph, p.Ctx.RootNode, node, nil)
}

Mirar si dos nodos están unidos con un tipo de link determinado:
g.AreLinked(n1, n2, Metadata{"RelationType": "simpleLinker"}


Analyzer probe:
A grandes rasgos se suele implementar de la siguiente manera.
Implementamos unos indexers para los tipos de datos que queremos enganchar.
Por ejemplo, uno para los listen ports, que se alimentará de cierta información de Metadata y devolverá un map con hashes de las conex que tiene.
Por otro lado haremos algo similar para las conex salientes.

Hasta aqui tendremos unos "índices" (en el sentido de bbdd), donde podemos pasar unos valores y nos devuelve el nodo que lo tiene.

Ahora implementamos los GetABLinks/GetBALinks, que deben devolver los links del nodo que se para como argumento.
Lo que haremos es coger de la metadata sus conex remotas y buscar en el índice algún listener que matchee y entonces creamos el edge.

Cuando generamos el Linker llamando a NewResourceLinker, pasamos los listas de handlers, glhs1 y glhs2.
Cuando se produce un evento en glhs1 se llama a GetABLinks
Cuando se produce un evento en glhs2 se llama a GetBALinks
No tenemos porque necesitar implementar ambos.




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



# Alerts
http://skydive.network/swagger/#operation/createAlert

Se pueden ejecutar scripts locales o ejecutar webhooks cuando se haga match de una expresión gremlin (puede tener procesado con javascript).
http://skydive.network/documentation/cli#alerting



# Graffiti
https://fosdem.org/2020/schedule/event/graph_graffiti/
Base de datos de grafos que funciona como backend

Ejemplo en python para comunicarse con la graffiti:
https://github.com/skydive-project/skydive/blob/master/contrib/python/api/samples/fs-watcher.py

Tenemos que distinguir que datos son de "skydive" y cuales de "graffiti".


## Schema / topology
La primary key de los nodos es Metadata.Name+Metadata.Type (si creamos dos nodos que compartan esos parámetros se tratarán como el mismo)

Por debajo se almacena como una serie de Nodes y Edges.
Podemos hacer un dump de la topología:
SKYDIVE_ANALYZERS=127.0.0.1:8082 ./skydive client topology export > graph.json

Y también subir un dump (con la cli que se instala con python)
SKYDIVE_ANALYZERS=127.0.0.1:8082 ./skydive client topology import --file graph.json


## Desarrollo

### Tests funcionales
make functional TEST_PATTERN=APIPatchNode
make functional TEST_PATTERN=APIPatchNode$
  esto hará match de uno que termine con esa cadena exactamente

hace falta tener un elasticsearch escuchando en :9201, en el mismo namespace de red (usa la IP interna de ES para conectar):
podman run --net host --rm -it -p 9201:9200 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.10.2


## Client
http://skydive.network/blog/topology-rules.html
Para interactuar con los analyzers, crear nodos, etc.
SKYDIVE_ANALYZERS=127.0.0.1:8082 ./skydive client status

SKYDIVE_ANALYZERS=127.0.0.1:8082 ./skydive client node-rule create --action create --description cli --name archerRule --node-name archer --node-type fabric --metadata 'foo=bar, bar=foo'

SKYDIVE_ANALYZERS=127.0.0.1:8082 ./skydive client node create --host pepito2 --metadata 'Type=v2'

Crear edge:
skydive client edge-rule create --src "G.V().Has('Name', 'miveth')" --dst "G.V().Has('Name', 'mivm1')" --relationtype ownership

Los nodos y edges creados con "node-rule" y "edge-rule" no pertenecen a skydive.
Pero si están en la bd de graffiti
Si creamos un edge-rule y no hace match se quedará escuchando a ver si aparece algún nodo que haga match y en ese momentó creará la rule.

Si creamos un edge typo "ownership" y el nodo child ya tenía otra relación de ownership con otro parent, se borrará la antigua y se creará esta nueva.
Del código: "a child node can only have one parent of type ownership, so delete the previous link"
https://github.com/skydive-project/skydive/blob/b7609ba971e37b9a43cb6bf9977d4160e2644334/topology/topology.go#L130


Lanzar query:
./skydive client query "G.V()"


Actualizar un nodo:
./skydive client node-rule create --action update --query "G.V().Has('Name', 'nodoA')" --metadata 'foo=bar'
  en este caso añadiremos más metadata (no se sustituye, se hace append)
  con curl: curl http://127.0.0.1:8082/api/noderule -d '{"Action": "update", "Metadata":{"Alarms": [{"Name": "disk", "Severity": 1}]}, "Query": "G.V().Has(\"Name\", \"test1\")"}'



## Gremlin
http://skydive.network/documentation/api-gremlin
Queries para atacar a graffiti.

Definición oficial del lenguaje: https://tinkerpop.apache.org/docs/current/reference/#graph-traversal-steps

Mirar como estaba la db de grafos en un momoento del tiempo.
./skydive client query "G.At('Thu, 14 May 2020 15:12:04 CEST')"

"Context" es lo mismo que "At".
A estos dos también se le puede pasar al fecha en unix epoch.
También podemos pasarle "NOW".
Y podemos usarlo para definir un rango: At(NOW, 3600), que sería la última hora.
En ese caso nos devolverá todos los nodos que estaban en esa hora, aunque se hayan borrado o modificado (obtendremos el previo a la modificación y el modificado).

Obtener los nodos de un type y sus descendientes. Se puede pasar un parámetro a Descendants para decir cuantas veces debe buscar hacia abajo, ejemplo Descendants(4):
G.V().Has("Type", "VMs").Descendants()

Descendientes usando otro RelationType que no sea ownership, bajando 3 niveles:
Descendants('RelationType', Within('ownership', 'ownership_shared'), 3)

Descendants internamente hace:
  para cada nodo del step anterior, obtener sus children (nodos conectados por determinado edge, GetNodeEdges+GetEdgeNodes) y ejecutar de nuevo descendants para esos nodos.


Ascendants
https://github.com/skydive-project/skydive/pull/2373

NextHop('1.2.3.4')
Step de skydive (no de graffiti) para obtener el siguiente salto IP.
Usando skydive con la probe netlink, le puedo pedir NextHop a las tarjetas de red.
Ejemplo de salida
  "f575fa00-d461-4acb-70f9-1b2811e5c2e1": {
    "Priority": 0,
    "IP": "192.168.213.23",
    "MAC": "5e:94:a8:08:20:e5",
    "IfIndex": 17
  }


Si queremos obtener añadir los links a partir de un filtro:
.SubGraph()

Generar varios grafos y unirlos
G.V().Has('Type', 'netns').As('result1').G.().Has('Type', 'device').As('result2').Select('result1', 'result2')

Caso típico para regenerar un grafo:
G.V().Has('Type', 'netns').As('result1').G.().Has('Type', 'device').As('result2').Select('result1', 'result2').Dedup().Subgraph()

Camino más corto:
Entre el nodo elegido y el marcado en el ShortestPathTo
G.V().Has('Type', 'netns').ShortestPathTo(Metadata('Type', 'host'))

Si queremos que solo pase por ciertos tipos de edges le pasaremos un segundo parámetro:
G.V().Has('Type', 'netns').ShortestPathTo(Metadata('Type', 'host'), Metadata('RelationType', 'layer2'))


Sort(), por defecto ASC
Sort(DESC, 'Revision'), ordenar de manera descendente por el campo "Revision".

Si usamos G.At() podemos tener varios nodos con el mismo ID.
Si usamos Dedup() para quedarnos solo con uno, esto no nos asegura quedarnos con el más reciente.
Para quedarnos con los más recientes podemos hacer:
G.At(a,b).Sort(DESC,'Revision').Dedup()


Steps vistos en el código:
g
v
e
has
haskey
hasnot
haseither
out
in
outv
inv
bothv
oute
ine
bothe
within
without
dedup
metadata
shortestpathto
ne
nee
both
context
regex

Filtros para valores numéricos:
lt
gt
lte
gte
inside
between

count
range

limit
sort
values
  extrae solo un campo del Metadata. Ej.: g.V().Has('Name', 'enp0s20f0u2').Values('Metric')
valuemap
  como el anterior, pero devuelve la key, 'Metric' por ejemplo, con sus valores, se pueden pedir varios. Ej.: g.V().Has('Name', 'enp0s20f0u2').ValueMap('Metric', 'IPV4')
keys
  obtener las keys
sum
asc
desc
ipv4range
subgraph
forever
now
as
select
true
false




## API
http://skydive.network/swagger/
http://skydive.network/documentation/api#topologyflow-request

Estado de skydive, que probes tiene cargadas, publishers, subscribers, etc
curl localhost:8082/api/status

Running config:
curl localhost:8082/api/config/KEY
Ejemplo:
curl localhost:8082/api/config/analyzer



Podemos ver como funciona "skydive client"

node/edge VS noderule/edgerule
  node is to create a node directly, while node rule is to create node based on event on the graph
  for example, in order to create a node if another one is present or to update a node if a node has specific attributes

  noderule and edgerule APIs create objects on etcd
  with these, Skydive will watch the graph and react on changes : when a change occurs, it will check if an noderule/edgerule applies and will apply the change specified by the rule
  the main purpose was when you are Skydive with agents. If you want to add metadata on a node created by an agent, we would use noderule to create additional properties
  the node and edge API are simpler (dumber ?) : you directly create nodes and edges on the graph

Los nodos y edges creados con "node-rule" y "edge-rule" no pertenecen a skydive.
Pero si están en la bd de graffiti

Mediante websockets sí que podemos meter nodos en skydive.

A partir de esta PR si se se pueden crear nodos/edges de skydive mediante la API
https://github.com/skydive-project/skydive/pull/2139

Donde están los ficheros para gestionar las llamadas API node/edge
graffiti/api/server

El server web, mux, se define en graffiti/http/server.go
Es hub.NewHub quien crea ese server mux.
  distintas llamadas a api.RegisterXXX van registrando los endpoints
  Y esos endpoints definen que funciones (handlers) gestionarán las llamadas.


## ETCD
Usa etcd para gestionar el cluster

Cuando usa un etcd externo debe ser un v2

Configuraremos:
etcd:
  embedded: false
  servers:
    - http://127.0.0.1:2379




### RAW / Topology
Obtener toda la topología:
curl 127.0.0.1:8082/api/topology

Lanzar una query gremlin sobre la topología:
curl 127.0.0.1:8082/api/topology -H "Accept: application/json" -H "Content-Type: application/json" -d '{"GremlinQuery": "G.V().Has(\"Name\", \"TOR3\")"}' | jq

Crear noderule:
curl 127.0.0.1:8082/api/noderule -H "Content-Type: application/json" -d '{"Name":"jRule","Description":"directora","Metadata":{"Foo":"bar","Name":"Jaria","Type":"people"},"Action":"create","Query":"","UUID":""}'

curl http://127.0.0.1:8082/api/noderule -d '{"Action": "create", "Metadata":{"Name": "nodo", "Type": "VMs"}}'

Actualizar:
  Seleccionando con ID:
    curl http://127.0.0.1:8082/api/noderule -d '{"Action": "update", "Metadata":{"ID": "74baf067-ee31-5458-7b0d-c7ea8d46afb7", "Alarms": [{"Name": "disk", "Severity": 1}]}}'
  Seleccionando con una query:
    curl http://127.0.0.1:8082/api/noderule -d '{"Action": "update", "Metadata":{"Alarms": [{"Name": "disk", "Severity": 1}]}, "Query": "G.V().Has(\"Name\", \"test1\")"}'


Crear edge rule:
curl  http://127.0.0.1:8082/api/edgerule -H "Content-Type: application/json" -d '{"Src": "G.V().Has('Name', 'nodo')", "Dst": "G.V().Has('Name', 'nodo2')", "Metadata":{"foo": "bar"}}'


Crear nodo:
curl 127.0.0.1:8082/api/node -H "Content-Type: application/json" -d "{\"ID\": \"test\", \"CreatedAt\": $(date +%s%3N), \"UpdatedAt\": $(date +%s%3N), \"Metadata\": {\"Name\": \"foo\", \"Type\": \"bar\"}}"
Si usamos el binario de skydive para crear nodos, el automáticamente mete:
  "ID":"a78601e2-a3d7-4bbc-63b8-fffa83c69f54"   (función graph.GenID(), uuid.NewV4())
  "Origin":"agent.archer"                       (config.AgentService)
  "CreatedAt":1593006895231                     (time.Now())
  "UpdatedAt":1593006895231                     (time.Now())
  "Revision":1                                  (a fuego, siempre 1)

Parchear nodo:
curl -H "Content-Type: application/json" -XPATCH localhost:8082/api/node/1f0058f8-2505-11eb-8a2c-005056934e00 -d '[{"op": "add", "path": "/Metadata/Alarms/123456789", "value": {"description": "Fake alarm", "level": 3, "datetime": "2020-11-12T17:58:48.570777"}}]'


Crear edge:
curl 127.0.0.1:8082/api/edge -H "Content-Type: application/json" -d "{\"ID\": \"test\", \"CreatedAt\": $(date +%s%3N), \"UpdatedAt\": $(date +%s%3N), \"Origin\": \"CMDB-Syncer\", \"Metadata\": {\"RelationType\": \"foo\"}, \"Child\": \"a\", \"Parent\": \"b\"}"


### Python
http://skydive.network/documentation/api-python

Tanto para solicitar cosas (API REST) como para modificar o recibir cambios del grafo, via websockets

pip install skydive-client

Biene con un pequeño cliente para websockets, aunque es mejor "skydive agent"
skydive-ws-client --analyzer localhost:8082 --username admin --password password  add /tmp/skydive.dump

from skydive.rest.client import RESTClient
restclient = RESTClient("127.0.0.1:8082")
nodes = restclient.lookup_nodes("G.V().Has('Name', 'TOR3')")
nodes[0].metadata

restclient.noderule_create("create", {"Name": "pruebavm3", "Type": "libvirt"})

res = graffiti.node_create(node_id=node_id, metadata=metadata).repr_json()



En la respuesta nos devuelve un json con lo que ha creado.
No nos avisa si alguna de las queries no ha hecho match.
Pero si da error en skydive:
  (*TopologyManager).createEdge e66b00ef339a: Source or Destination node not found

restclient.edgerule_create(
    f"G.V().Has('Name', '{edge.get(PARENT)}')",
    f"G.V().Has('Name', '{edge.get(CHILD)}')",
    {
        "RelationType": edge.get(TYPE, "ownership"),
    },
)




# Elastic backend
Los nodos los crea en el índice skydive_topology_live_v12 (alias skydive_topology_live).
Cuando se borra un nodo o edge lo mueve al índice skydive_topology_archive_v12-NNNNNN (alias skydive_topology_archive) y le pone DeletedAt y ArchivedAt.

Si parcheamos un nodo (PATCH), nos mueve el documento antiguo al archive y crea uno nuevo en el índice "live", actualizando el UpdatedAt y haciendo +1 al Revision (este campo empieza en 0).
El que mueve al archive le mete el campo "ArchivedAt"

Lo que hace es enviar un POST al endpoint /_bulk con dos operaciones.
En la primera crea un nuevo documento en el índice archive con el estado actual del nodo/edge.
En la segunda operación, selecciona un documento de ES y lo actualiza con los nuevos datos.

## Parametrizacion
storage.elastcisearch.bulk_maxdelay
  agrupa las operaciones sobre ES durante los segundos que pongamos.
  No evita hacer las operaciones (creación, updates), pero conseguir reducir el número de llamadas HTTP

storage.elastcisearch.index_entries_limit
  para los índices "archive", si superan este número de entradas, se genera uno nuevo
  Si el límite es 10, cuando se llega a 10, en el próximo rolling, se genera un nuevo índice.
  skydive_topology_archive_v13-000001
  skydive_topology_archive_v13-000002
  etc

  El índice live no rota

  El rolling de índices se ejecuta cada minuto (no es configurable https://github.com/skydive-project/skydive/blob/846fda84d07c50dc46d20688b99ff6e1b5f69449/graffiti/storage/elasticsearch/rollindex.go#L37)

indices_to_keep
  cuantos índices "archive" deben mantenerse.
  Si elegimos dos, al rotar, si se necesita crear un tercero, se borrará el más antiguo.


Tamaño de los índices.
Para hacer un cálculo aproximado del tamaño que ocupan las cosas en ES podemos poner:
1M de documentos -> 1GB

Habrá que dejar un espacio extra para funcionamiento de ES (datos antes de flushearlos, etc)



## Datos permanentes
Teóricamente a partir de esta PR se consigue permanencia en los datos (que si se reinicia el server de skydive no se pierdan los datos).
Entiendo que usando un etcd externo
https://github.com/skydive-project/skydive/pull/2221

Hace esta query a ES para recuperar los datos:
{"query":{"bool":{"must":[{"term":{"_Type":"node"}},{"bool":{"must_not":{"exists":{"field":"ArchivedAt"}}}}]}},"size":10000,"sort":[{"UpdatedAt":{"order":"asc","unmapped_type":"date"}}]}

Parece que la magia está en:
https://github.com/safchain/skydive/blob/d254aee281c5d713f8c39a3cd98e7d1ddcbeb396/graffiti/graph/cachedbackend.go#L207
https://github.com/skydive-project/skydive/blob/8a76bba8a9e9b611698910258da8316f130fd3dc/graffiti/graph/cachedbackend.go#L211
  más reciente

Parece que metieron cambios para no recuperar todo https://github.com/skydive-project/skydive/commit/7c0d9c284cff55472da4442fff571790a7978818
A partir de este cambio lo que se hace es, tras arrancar:
 - Marcar como DeletedAt y ArchiveAt en ese momento los nodos con Origin: analyzer\..*
 - Obtener los "nodes" que no estén archivados ni tengan Origin: analyzer\..*
 - Obtener los "edges" que no estén archivados ni tengan Origin: analyzer\..*



# Graffiti UI
https://github.com/skydive-project/graffiti-ui
Basada en ReactJS

docker run -p 8080:8080 skydive/skydive-ui

Pruebas de visualización
https://github.com/skydive-project/skydive-ui/tree/master/tools/csvstoskyui

Con Alt+Click podemos mover los "rows"

Si no hay ninguna relación entre nodos, no pinta nada -> Arreglar


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
Puede sustituirse por una URL, mirar App.tsx fetchExtraConfig, parámetro extraConfigURL

src/App.tsx y src/Topology.tsx agrupan prácticamente toda la lógica. Dos ficheros enormes

src/api/api.ts lib autogenerada por swagger para comunicarnos con la API rest del analyzer

Debug: desde la consola del navegador podemos acceder a todas las funciónes con: window.App.XX

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



### Topology
Usa tree de d3 para generar el arbol.
Le pasa un dict con nodos y children y el tree le genera la estructura y las coordenadas (según unos valores con los que inicializamos).

Se usa https://github.com/d3/d3-selection para selecionar nodos y trabajar con ellos.

Para generar el "arbol", se le pasa un nodo root con los child a la funcion "tree" de d3:
https://observablehq.com/@d3/tidy-tree
https://github.com/d3/d3-hierarchy/blob/v1.1.9/README.md#hierarchy


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
  badges (iconitos que le aparecen arriba, https://fontawesome.com/cheatsheet)

Las relaciones de "ownership" solo pueden ser 1:N (un hijo no puede tener varios padres), pero si podemos crear otros tipos de edges M:N (creo, he probado N:1)

El weight sirve para ordenar los distintos tipos de nodo, pero solo cuando no tienen relacion de ownership.
En caso de tener ownership, el parent siempre va arriba


Tal vez que la UI detecte automáticamente un doble ownership y gestione otro tipo de enlace?


### Edges
Pueden tener atributos especiales: color, movimiento, dirección, etiqueta.
Mirar función linkAttrs en Config.ts



## Analyzer

### API REST
graffiti/api/server/server.go
  Si estamos creando/actualizando algo, se llamará a la función "Create(resource Resource, createOpts *CreateOptions) error" (graffiti/api/rest/rest.go)
  Esa función create la gestiona un handler, que ha sido previamente registrado con "RegisterAPIHandler"
  En particular, la de creación de nodos: api/server/node.go RegisterNodeAPI
  "func (h *NodeAPIHandler) Create" añade el nodo al graph: "h.g.AddNode(&graphNode)"
  Esa llamada mete el nodo en el backend y genera un evento (g.eventHandler.NotifyEvent(NodeAdded, n))
  Esta notificación parece que termina llamando a g.currentEventListener.OnXXX, por ejemplo g.currentEventListener.OnNodeUpdated

  Por otro lado, el topoloy manager, en su función syncTopology(), recorre los nodos y los procesa, Esto solo para las "rules"?

  En algún momento llega a "func (tm *TopologyManager) handleCreateNode(node *types.NodeRule) error", que ejecuta "tm.updateMetadata(node.Query, node.Metadata)"


  Al crear un nodo su definición tiene que validarse contra el JSON schema: statics/schemas/node.schema


#### Parser gremlin
TopologyGremlinQuery
  Parse itera por los steps separador por punto, obteniendo un array de steps (GremlinTraversalStep)
    parserStep hace validación de los datos y devuelve el GremlinTraversalStep que toque
      scanIgnoreWhitespace obtener el token (número que representa lo que se ha reconocido: G, At, Dedup, etc)
        scan
          Scan
            scanIdent este reconoce ya los steps de graffiti. Si no encuentra nada busca en las extensiones
              extension.ScanIdent se llama a las extesiones para ver si reconocen el step y que devuelvan un token que lo represente
      parseStepParams se parsean los parámetros del step
      extension.ParseStep en caso de no encontrar un step de graffiti, se llama a esta función de las extensiones, que deberá devolver un GremlinTraversalStep
  Exec va iterando por el array de steps
    step.Reduce recibe el step siguiente (GraphTraversalStep) y devuelve GraphTraversalStep
    step.Exec recibe los valores del anterior step, transforma y devuelve otra serie de valores (GraphTraversalStep)

Aqui es donde se reconocen las distintas funciones:
graffiti/graph/traversal/traversal_scanner.go
func (s *GremlinTraversalScanner) scanIdent() (tok Token, lit string) {

Algunos de los steps se implementan en (los de skydive, que no de graffiti):
gremlin/traversal/

El resto en graffiti/graph/traversal/traversal.go
Por ejemplo "Out()": func (tv *GraphTraversalV) Out(ctx StepContext, s ...interface{}) *GraphTraversalV {

Si queremos crear un step nuevo en skydive (no en graffiti):
  - le asignaremos un token en gremlin/traversal/token.go
  - lo añadiremos en analyzer/server.go y validator/validator.go
  - crearemos un fichero en gremlin/traversal/NOMBRE.go
    - implementaremos un traversal.GremlinTraversalExtension (para que el parser pueda reconocer cuando encuentra un la query este nuevo step)
    - implementaremos traversal.GremlinTraversalStep (la implementación del step en si misma)


### Backend
Interfaz que cumplen:

type Backend interface {
  NodeAdded(n *Node) error
  NodeDeleted(n *Node) error
  GetNode(i Identifier, at Context) []*Node
  GetNodeEdges(n *Node, at Context, m ElementMatcher) []*Edge

  EdgeAdded(e *Edge) error
  EdgeDeleted(e *Edge) error
  GetEdge(i Identifier, at Context) []*Edge
  GetEdgeNodes(e *Edge, at Context, parentMetadata, childMetadata ElementMatcher) ([]*Node, []*Node)

  MetadataUpdated(e interface{}) error

  GetNodes(t Context, m ElementMatcher) []*Node
  GetEdges(t Context, m ElementMatcher) []*Edge

  IsHistorySupported() bool
}


### Graph
Si queremos buscar nodos/edges nos suele pedir un ElementMatcher.
Ejemplo:
softwareNodeFilter := graph.NewElementFilter(filters.NewTermStringFilter(MetadataTypeKey, MetadataTypeSoftware))

Los tipos de filtros que podemos poner:
https://pkg.go.dev/github.com/skydive-project/skydive/filters


### Metadata
Cada probe puede registrar uno o varios MetadataDecoders.
Lo que estaremos haciendo es definir que para Metadata.XXX se utilice un decoder específico, en vez de deserializar el JSON "tal cual".

Esta función de graph será la encagada de usar esos metadata decoders y devolvernos un nodo a partir de una secuencia de bytes.
func (n *Node) UnmarshalJSON(b []byte) error



# Performance

## skydive_prof
Podemos compilar skydive con profiling integrado
WITH_PROF=true make

Una vez arrancado, si queremos obtener datos del profiling le mandaremos señales.
Escribirá una traza INFO para avisar de que ha recibido la señal y que hace.
Generará los ficheros en /tmp

Arrancar/parar profiling CPU:
pkill -USR1 skydive

Hacer profiling de memoria:
pkill -USR2 skydive



## Version master 237bbd779875fd0d2743a31386c593330956c476 19/2/2021

### Skydive sin backend

Tras crear nodos distintos de 200bytes (medidos en el JSON que se envía)

Nodos   |   RSS     | RATE
10000       26        ~330 nodos/s (en modo DEBUG)
100000      166       ~300 nodos/s (en modo INFO)

Entre 1.6 y 2.6 KB/nodo


# Version v0.27.0_datadope-2

## Sin backend. Probes no configuradas
Nodos   |   RSS     | RATE
10k         24        345

## Sin backend. Probes proccon y procpeering
Nodos con Metadata.TCPConn y TCPListen con una ip:puerto cada uno.
Nodos   |   RSS     | RATE
10k         19        380

## Sin backend. Probes proccon y procpeering
Nodos entrando mediante proccon
Velocidad cae según inyectamos más nodos.
Desde unos 300 hasta 67 nodos/s

Req     |   RSS     | RATE
10k         107       67

Está claro que tiene que consumir más memoria porque tiene que crear el nodo server+edge+software
20k nodos
10k edges

Dejo corriendo esos mismos 10k nodos de forma repetitiva:
Durante 30' ha crecido 4MB


## Sin backend. Probe proccon (procpeering quitada en código)
Cuando consume proccon y como afecta

El rate cae a 200 ya en 10% y a 100 en 30%

Req     |   RSS     | RATE
10k         79         67
30k         233        25

10k req generan: 20k nodos y 10k edges
30k req generan: 60k nodos y 30k edges


## Jugando con lo benchmarks de los tests de procpeering
0.97 KB cada nodo, solo con Metadata Name, Key, TCPConn vacio y TCPListen vacío
1.1  KB cada edge, con Metadata.RelationType y Destination

1.32 KB cada nodo, solo con Metadata Name, Key, TCPConn vacio y TCPListen con una conex.
2.47 KB cada nodo con lo anterior más el índice de conex listen
1.14 KB de índice listen por nodo

1.62 KB cada nodo, solo con Metadata Name, Key, TCPConn con una conex y TCPListen con una conex.
4.00 KB cada nodo con lo anterior más índices
2.34 KB de índices (conn y listen)

2.34  KB cada nodo con 10 conex en tcp y 10 en listen, 70 bytes por conex
10.25 KB cada nodo con lo anterior más índices
8.00  KB de índices, 20B de índice por conex


Cálculo uso de memoria:
Nnodos * (1 + 0.068 * Nconex/nodo) + Nedges * 1.1



## Metiendo size.Of en el código del procpeering y graph.
Start: 134.3 MB RSS y listenIndexer=16 connIndexer=16 GraphNodes=8 GraphEdges=8
10 MB RSS -> GraphNodes=324936


## Simulando
50k hosts "estáticos"
2k hosts "dinámicos" (que reciben métricas de telegraf de conex)
5 softwares por host dinámico
4 listener por software
8 conexiones por software

Sin los nodo estáticos: 380MB de RSS
Con los nodos estáticos: 515MB de RSS

Al meter los nodos estáticos ha subido mucho el consumo de CPU.
Ha pasado de prácticamente no consumir (1-2%) a estar constántemente alrededor del 170%.
Posíblemente ahora cada búsqueda de un host es más costosa.

El rate al que proccon acepta métricas también ha caído mucho, a 3 por segundo aprox.



# Logging / trazas
Las trazas usan la librería de logging ZAP
El formato es:
2021-04-13T11:26:20.539Z        ERROR   proccon/proccon.go:232 ....

El valor de nivel puede ser:
Debug -> DEBUG
Info -> INFO
Notice -> INFO
Warning -> WARN
Error -> ERROR
Critical -> DPANIC
Panic -> DPANIC
Fatal -> DPANIC




# Monitorización / monitoring
Cosas que me gustaría tener.

Número de gorutinas (para ver si proccon está encolando gorutinas sin poder procesarlas).
Tiempo de procesado de las peticiones que llegan a proccon.
Consumo de memoria interno.
Número de peticiones a ES.
Tracing del coste de cada petición pasando por las distintas partes.
Número de nodos y edges.
Tiempo de procesado de las llamadas a la API.
