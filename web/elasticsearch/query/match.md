GET blog/_search
{
  "query": {
    "match": {
      "FIELD": "TEXT"
    }
  }
}

Si en TEXT tenemos varias palabras se utilizará "OR" entre las palabras
No se tiene en cuenta el orden de las palabras (mirar match_phrase para eso)



Si queremos hacer AND entre las palabras:
GET blog/_search
{
  "query": {
    "match": {
      "FIELD": {
        "query": "some words",
        "operador": "and"
      }
    }
  }
}



# minimum_should_match
Si queremos hacer un OR de varios elementos y que matche al menos dos:
{
  "query": {
    "match": {
      "FIELD": {
        "query": "some words",
        "minimum_should_match": 2
      }
    }
  }
}


# fuzziness
https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-fuzzy-query.html
Es costoso! Podemos usar prefix_length para no tener en cuenta los primeros N caracteres en el fuzziness y asi evitar tener que mirar todos los terminos del índice.
max_expansions, cuantos terminos podrán volver, por defecto 50

Como poder hacer busquedas cuando los terminos no están bien escritos.
Por ejemplo:
"shark alocasion" cuando querían buscar "shard allocation"

fuzziness=1, permite un cambio, por ejemplo de shark -> shard
fuzziness=2, por ejemplo alocasion -> allocation (una 'l' más 's'->'t')

No se puede subir de 2.

Cuidado con fuzziness 2 y palabras cortas: hi -> "jim", "tim", "uri", "phil", "cj", "ali", etc

Si ponemos fuzziness=auto, se tendrá en cuenta la longitud de la palabra para aplicar un nivel u otro de fuzziness

Como afecta al scoring: https://www.elastic.co/guide/en/elasticsearch/guide/current/fuzzy-scoring.html

GET blogs/_search
{
  "query": {
    "match": {
      "content": {
        "query": "shark",
        "fuzziness": 1
      }
    }
  }
}

GET /_search
{
    "query": {
       "fuzzy" : { "user" : "ki" }
    }
}



# exact terms
Podemos usar los subfields .keyword para hacer búsquedas exactas.
Por defecto el mapping para los text nos almacena el subfield .keyword sin pasar por el analyzer, tal cual lo hayamos pasado.
Típicamente lo usaremos como un filter, para que no afecte al scoring.

GET blogs/_search
{
  "_source": "author",
  "query": {
    "match": {
      "author.keyword": {
        "query": "Bohyun Kim"
      }
    }
  }
}


# match_phrase
Con esta búsqueda tenemos en cuenta el orden de las palabras
Más costoso
{
  "query": {
    "match_phrase": {
      "FIELD": "TERM"
    }
  }
}

"slop" nos permite definir cuantos "saltos" se pueden realizar para que nuestra query matchee.
Ejemplo, si buscamos "open data" con slop=1, "open xxx data" también será un match.
Otro ejemplo con slop 1: "open data" encontraría "data open"
