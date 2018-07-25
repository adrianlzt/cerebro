https://www.elastic.co/guide/en/elasticsearch/reference/current/array.html

Podemos almacenar arrays de elementos, excepto de objectos donde tenemos que tomar medidas especiales.

Las queries cambian, porque una búsqueda normal podria matchear elementos de distintos arrays y devolvernos un resultado incorrecto.
  "tags": [ {"key": "event", "value": "Christmas"}, {"key": "folder", "value": "December2017"} ]
  "tags": [ {"key": "event", "value": "vacation"}, {"key": "holiday", "value": "Christmas"} ]
  "must": [ { "match": { "tags.key": "event" } }, { "match": { "tags.value": "Christmas" } } ]
    este match matchearia los dos documentos, pero no es lo que queremos.


# Nested
https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html

Al definir el mapping podemos definir una propertie como "nested".
ES por debajo almacenará cada elemento del array como un documento diferente.
Esto tiene un coste, estamos indexando más documentos y teniendo que hacer un join en tiempo de búsqueda.
Luego podremos hacer búsquedas tipo:
  user.first = "John"

Siendo los datos indexados:
{
  "group" : "fans",
  "user" : [
    {
      "first" : "John",
      "last" :  "Smith"
    },
    {
      "first" : "Alice",
      "last" :  "White"
    }
  ]
}



Ejemplo de búsqueda nested (busca la key y el value que pertenecen al mismo objeto del array):
GET ansible_facts_test7/_search
{
  "_source": ["ansible_facts.ansible_cmdline.key", "ansible_facts.ansible_cmdline.value"],
  "query": {
    "nested": {
      "path": "ansible_facts.ansible_cmdline",
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "ansible_facts.ansible_cmdline.value": "en_US.UTF-8"
              }
            },
            {
              "match": {
                "ansible_facts.ansible_cmdline.key": "LANG"
              }
            }
          ]
        }
      }
    }
  }
}




Ejemplo de mapping para una estructura tipo:
    "ansible_facts": [
      "packages": [
        {
          "key": "keyutils",
          "value": [
            {
              "name": "keyutils",

ansible_facts:
  properties:
    packages:
      properties:
        key:
          type: keyword
        value:
          type: nested
          properties:
            name:
              type: keyword


Y query para filtrar por el campo nested:
GET ansible_facts_test12/_search
{
  "query": {
    "nested": {
      "path": "ansible_facts.packages.value",
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "ansible_facts.packages.value.name": "keyutils"
              }
            },
            {
              "match": {
                "ansible_facts.packages.value.release": "3.el7"
              }
            }
          ]
        }
      }
    }
  }
}


Si queremos saber que elemento del array ha hecho match podemos usar inner_hits
GET photos/_search{
  "query": {
    "nested": {
      "path": "tags",
      "query": {
        "match": {
          "tags.value": "Christmas"
        }
      },
      "inner_hits": {}
    }
  }
}


# Nested aggs
GET photos/_search{
  "size": 0,
  "aggs": {
    "my_tags": {
      "nested": {
        "path": "tags"
      }
    }
  }
}



Contar cuantos elementos de cada tipo "key" tenemos
GET photos/_search{
  "size": 0,
  "aggs": {
    "my_tags": {
      "nested": {
        "path": "tags"
      },
      "aggs": {
        "tag_terms": {
          "terms": {
            "field": "tags.key",
            "size": 10
          }
        }
      }
    }
  }
}



Kibana tiene limitaciones con los nested: https://www.elastic.co/guide/en/kibana/current/nested-objects.html
  no puede hacer agregaciones con objetos nested
  no puede buscar sobre nested objects si usamos lucene syntax en la barra de búsqueda
  Parece que hay un plugin que permite, pero puede que no sea muy eficiente.
