https://www.elastic.co/guide/en/elasticsearch/reference/5.6/_basic_concepts.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/glossary.html

Index: colleción de documentos que comparten características similares.

Mapping: define los fields de un índice (puede ser autogenerado)

Document: la unidad básica de información que puede ser indexada en formato JSON

Shards: divisiones físicas de un index. Cada shard puede estar en un nodo distinto. Permite escalado horizontal. Permite paralelizar operaciones

Replicas: copias exactas de los shards distribuídas en distintos nodos. Provee HA en caso de fallo de un nodo. Mayor throughput porque las búsquedas se pueden ejecutar en paralelo en las réplicas

Type (DEPRECATED): categoría/partición lógica dentro de un índice. Distintos types de un index deberían tener estructuras similares


El número de shards y réplicas de un índice se definen en su creación. El número de réplicas se puede modificar tras la creación, pero NO el número de shards.



MySQL         ElasticSearch
------------  -------------------------
database      index
table         type
column/rows   documents with properties

Cuidado con esta analogía, no es correcta y puede llevar a errores.


# Index vs Type. NO EN ES6
https://www.elastic.co/blog/index-vs-type

A partir de ES6 solo un type por index, y se elimina el campo _type
https://www.elastic.co/blog/elasticsearch-6-0-0-alpha1-released#type-removal


Un index se reparte en varios shards.
Cada shard es un index de Lucene (cada uno de estos tiene un coste fijo en términos de espacio en disco, memoria y file descriptors)

Crear muchos índices (por lo tantos muchos shards) conlleva un coste fijo grande, por lo que es mejor reutilizar el mismo índice.

Otro problema con tener muchos índices son las búsquedas.
La búsqueda se produce de manera independiente en cada shard, pero luego hace falta un mergeo de los datos. Si hacen falta mergear muchos shards de muchos índices será muy costoso en CPU y memoria.


Types, es la manera de almacenar distintos tipos de documentos en el mismo índice. Se hace añadiendo un campo "_type" a cada documento.
Buscar por uno o varios types no cambia el coste de mergeo.


## Limitaciones de los types
Dentro de un índice, todos los fields con el mismo nombre deben ser del mismo tipo (string, date, etc), aunque pertenezcan a distintos _type

Fields que existen en un _type consumen espacio en todos los otros _types, aunque no lo estén usando.

Scores use index-wide statistics, so scores of documents in one type can be impacted by documents from other types.


## Usar Index o Type?
Are you using parent/child? If yes this can only be done with two types in the same index.
Do your documents have similar mappings? If no, use different indices.
If you have many documents for each type, then the overhead of Lucene indices will be easily amortized so you can safely use indices, with fewer shards than the default of 5 if necessary.
Otherwise you can consider putting documents in different types of the same index. Or even in the same type.
