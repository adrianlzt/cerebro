GET blog/_search
{
  "query": {
    "match": {
      "FIELD": "TEXT"
    }
  }
}

Si en TEXT tenemos varias palabras se utilizará "OR" entre las palabras



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
