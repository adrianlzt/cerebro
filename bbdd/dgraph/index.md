https://docs.dgraph.io/query-language/#indexing
https://docs.dgraph.io/master/tutorial-3/#indexing-in-dgraph

Debemos añadirlos a los predicates cuando vayamos a usar esos predicates con funciones que requieran su valor.


# Tipos de índices
Data type   Available index types
int         int
float       float
bool        bool
geo         geo
dateTime    year, month, day, hour
string      hash, exact, term, fulltext, trigram
  only the exact index is compatible with le, ge,lt, and gt built-in functions
  eq funciona con todos
  hash index would normally be the most performant to be used with the eq



# Crear índices
Usando ratel es muy sencillo.
Iremos a la tool "Schema", seleccionaremos el predicate y en sus propiedades seleccionaremos "index" y updateamos.

Por debajo está haciendo (para el caso del predicate "age" del tipo "int"):
curl 'http://localhost:8080/alter' -H 'Content-Type: text/plain;charset=UTF-8' --data '<age>: int @index(int) .'

Otro ejemplo creando un índice para el predicate "author_name" (que es de tipo string) usando el tipo de indice "term".
<author_name>: string @index(term) .
