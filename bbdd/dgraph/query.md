https://docs.dgraph.io/query-language

Las queries se crean en el lenguaje "GraphQL+-"
Es similar al GraphQL de Facebook, pero adaptado según las necesidades de DGraph.

{
  NOMBRE(func: has(name)) {
    uid
    name
  }
}

"NOMBRE" es una cadena aleatoria que nosotros elegimos.
Luego especificamos que función vamos a usar para buscar en la bd.

"has" significa: buscar los nodos que tengan el predicate "name".

Entre los corchetes metemos los predicates que queremos devolver (como "SELECT a,b,c")

En la respuesta se nos entregará el UID de los nodos junto con la información solicitada.



# Funciones


Ejemplos de uso:
expand(_all_): finding all people who are related to a movie regardless of how they are related

@recurse: finding all of a person’s descendants regardless of how many generations they are apart

shortest: finding the shortest connection path between two people in a social network


uid(0xb5849, 0x394c)
Devueve los nodos que tengan los UIDs especificados


has(name)
Deuvelve los nodos que tengan un predicate "name"

## Funciones de comparación (necesitan indexación)
eq  equals to
lt  less than
le  less than or equal to
gt  greater than
ge  greater than or equal to

eq(name@en, "Blade Runner")
Ndos cuyo predicate "name@en" sea "Blade Runner"



# First / limit
 yourquery (func: has(some), first:30) {



# Traversing edges
Especificamos el predicate que hace de edge y ponemos los predicates que queremos obtener de ese nodo linkado.
Podemos repetir esa misma operación (de ir poniendo edges y sus parámetros) múltiples veces.

{
    find_follower(func: uid(MICHAELS_UID)){
        name
        age
        follows {
          name
          age
        }
    }
}


## Recursive traversing
Si queremos repetir un traversing usando el mismo campo, usaremos la directive "@recurse":

{
  find_follower(func: uid(MICHAELS_UID)) @recurse(depth: 4) {
    name
    age
    follows
  }
}



## Filtering traversals
Podemos filtrar en traversals usando la directiva "@filter"
El campo por el que filtramos no necesita estar indexado.

{
  authors_and_ratings(func: ge(rating, 4.0)) {
    author_name
    rating
    published @filter(lt(dislikes, 10)) {
      title
      dislikes
    }
  }
}


## Reversing traversals
Deberemos marcar el predicate para que tener un index "reverse".
Esto sería:

curl 'http://localhost:8080/alter' -H 'Content-Type: text/plain;charset=UTF-8' --data '<tagged>: [uid] @reverse .'

Al hacer la query "reverse" lo especificaremos con un "~".

Ejemplo, donde estamos "subiendo" desde un tag hacia su artículo.

{
  al_reves(func: eq(tag_name, "devrel")) {
    tag_name
    ~tagged {
      title
    }
  }
}



# curl
curl 'http://localhost:8080/query?timeout=60s&debug=true' -H 'Content-Type: application/graphql+-' --data $'{foobar(func: has(name)) {uid \n name }}' | jq

La respuesta estará en ".data"
