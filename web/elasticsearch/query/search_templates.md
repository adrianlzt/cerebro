https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html

Predefinir una búsqueda que luego se llamará pasándole unos parámetros.
Se usa Mustache para templating.

Benefits include:
  avoid repeating code in multiple places
  minimize mistakes
  easier to test and execute your queries
  share queries between applications
  allow users to only execute a few predefined queries

Generar template:
POST _scripts/<templatename>
{
    "script": {
        "lang": "mustache",
        "source": {
            "query": {
                "match": {
                    "{{my_field}}": "{{my_value}}"
                }
            }
        }
    }
}


Usar template:
GET _search/template
{
    "id": "<templateName>", ￼
    "params": {
        "my_field": "something"
        "my_value": "search for these words"
    }
}


Renderizar como va a quedar una búsqueda:
GET _render/template/<template_name>
{
  "params": {
    "..."
  }
}


# Mustache

## Conditionals
La forma de hacer "if/else":
{{#param1}}
  "This section is skipped if param1 is null or false"
{{/param1}}


Por ejemplo, solo filtrar por fecha si la definimos:
{{#search_date}}
  ,
  "filter": {
    "range": {
      "publish_date": {
        "gte": "{{search_date}}"
      }
    }
  }
{{/search_date}}



Ejemplo búsqueda compleja sobre varios campos (buscar el contenido sobre varios campos, dando más peso cuando las palabras vengan seguidas):
POST_scripts /blogs_webform_search {
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "bool": {
          "must": {
            "multi_match": {
              "query": "{{blog_query}}",
              "fields": [
                "title",
                "title.*",
                "content",
                "content.*"
              ],
              "operator": "and",
              "type": "most_fields"
            }
          },
          "should": {
            "multi_match": {
              "query": "{{blog_query}}",
              "fields": [
                "title",
                "title.*",
                "content",
                "content.*"
              ],
              "type": "phrase"
            }
          }
        }
      }
    }
  }
}
