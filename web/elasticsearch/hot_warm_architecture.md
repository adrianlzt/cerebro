https://www.elastic.co/blog/hot-warm-architecture-in-elasticsearch-5-x
https://www.elastic.co/blog/managing-time-based-indices-efficiently

Podemos configurar nuestros data nodes como una arquitectura hot/warm/(cold).
ES no está diseñado como un "storage", está pensando como un rápido buscador.
Esta arquitectura nos sirve para poder almacenar datos de una manera más "barata" y reduciendo el impacto para las búsquedas se mantengan rápidas.

Conseguimos una latencia pequeña para los datos que solemos acceder y una latencia mucho más alta para datos que no suelen ser accedidos.
En los "hot" serán donde estaremos escribiendo y será la información que estaremos consultando frecuentemente.
En los "warm" pondremos los datos que tenemos que almacenar pero en principio no estamos usando, no se escribiran nuevos datos (si acaso un reindex o update_by_query).

Los "hot" nodes tendrán unas especificaciones muy buenas en memoria, cpu, disco.
Los "warm" tendrán unas más limitadas. Será el mayor porcentaje de nodos data.

Los shards antiguos se irán moviendo a de los hot a los warm.
Esto tiene un coste de red, se puede controlar.
Por defecto 2 shards, 40Mbps, esto puede ser bastante poco para cargas reales.
Subir los valores es sencillo, pero no tanto bajarlos, por lo que lo mejor es ir subiendolos poco a poco hasta encontrar el valor que queremos.


# Shard filtering
Lo primero será etiquetar que nodo es de cada tipo: node.attr (chequear attrs: GET _cat/nodeattrs?v):
  Ej.: node.attr.cualquier_etiqueta: hot
       node.attr.node_type: hot
index.routing.allocation.include/exclude/require.{attr} para definir a donde se moverán los shards.

Como seleccionar los nodos:
include: at least one of the values
exclude: none of the values
require: all of the values


Luego tenemos que decir al índice a donde tiene que ir:
PUT logs-2017-03 {
  "settings": {
    "index.routing.allocation.require.my_node_type": "hot"
  }
}

Se pueden poner varias reglas al mismo tiempo, ej.:
  "index.routing.allocation.include.my_server" : "medium,small",
  "index.routing.allocation.exclude.my_temp" : "hot"


Mover un índice a otro data type:
PUT logs-2017-02/_settings
{
 "index.routing.allocation.require.my_node_type" : "warm"
}


Chequear asignación de shards por nodo:
GET _cat/shards/logs_server*?v&h=index,shard,prirep,node&s=index,shard,prirep,node
