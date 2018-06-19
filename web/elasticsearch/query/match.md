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
