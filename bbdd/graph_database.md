Una de las casúisticas donde graph db es mejor:
Imagine there is a people table, and a children table mapping each person_id to the person_ids of their children. The logic to find all the descendants of a person with SQL is not trivial and requires a bunch of back and forth interactions between the application and the database.


El grupo que define SQL está creando un lenguaje estandar para graph databaes:
GQL

https://neo4j.com/product/graph-data-science/
ML sobre neo4j
node classifications, edge predictions, community detection and more


Neo4j
The Graph Foundation for Internet-scale Applications
  Un mejor visualizador para neo4j
  https://neo4j.com/docs/labs/apoc/current/export/gephi/
  Parece que es bastante lento con las actualizaciones, dicho por compañeros y en https://github.com/skydive-project/skydive/issues/2239#issuecomment-654492149

dgraph
Otra opción, en go

Graffiti
https://fosdem.org/2020/schedule/event/graph_graffiti/
No tanto una bbdd pura de grafos, pero buena para inyectar datos y visualizar. Usa el lenguaje gremlin
Pensada para ser embedida en un proyecto de go
https://github.com/skydive-project/skydive/tree/897da7d5c13eff752da8c4dd48b8b46b64118afe/graffiti
skydive.md


# Container
podman run -d --name neo4j -p 7474:7474 -p 7687:7687 -v "$PWD/data:/data" neo4j:4.0


# Import CSV
https://neo4j.com/docs/developer-manual/3.2/cypher/clauses/load-csv/

LOAD CSV WITH HEADERS FROM 'file:///hosts.csv' AS line
CREATE (:Host { name: line.hostname })

Por defecto buscará el fichero en /var/lib/neo4j/import
Podemos modificarlo con dbms.directories.import


# Queries / Cypher

## Select
MATCH (n:Host) RETURN n LIMIT 25
  retorna los tipos de nodos "Host", le asigna el alias "n", retorna los "n" (Hosts) con límite 25

MATCH (h:Host {name: 'MA1-PV2'})
RETURN h.name
  filtrado básico

MATCH (h:Host),(p:Proc)
WHERE h.name = p.hostname
RETURN h,p


### Enlazando
MATCH (h:Host {name: 'MA1-PV2'})-[:procs]->(p:Proc)
RETURN h.name, p.name, p.uid, p.pid


## Crear relaciones
MATCH (h:Host),(p:Proc)
WHERE h.name = p.hostname
CREATE (h)-[:procs]->(p)


## Borrado
MATCH (p:Proc)
DETACH DELETE p

Si ponemos el "DETACH" primero deslinkaremos los nodos y luego los borraremos.


## Schema
CALL db.schema



# Datos
Convertir a int
toInteger()



# API

## HTTP
https://neo4j.com/docs/http-api/4.0/introduction/

curl http://localhost:7474/db/neo4j/tx/commit -H "Content-Type: application/json" -d '{
  "statements" : [ {
    "statement" : "MATCH (n) WHERE ID(n) = $nodeId RETURN n",
    "parameters" : {
      "nodeId" : 2
    }
  } ]
}'



# Dudas
Es tiempo real?
Si tenemos decenas miles de nodos y miles de relaciones como de rápido es actualizarla?
