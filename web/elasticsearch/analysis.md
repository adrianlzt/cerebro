https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html
https://www.elastic.co/guide/en/elasticsearch/guide/current/analysis-intro.html

Cuando se indexa y se busca se convierten las palabras a sus formas normalizadas (se coje la raíz).
zorros -> zorro
Zorro -> zorro

jumps/jumping -> jump

De esta manera conseguimos mejores búsquedas

También se eliminan las "stop words". Palabras no útiles, por ejemplo "the"


Se pueden crear sinónimos para nuestra casuística particular.

# Tipos de analyzers
standard - which is the default analyzer
  no character filters, standard tokenizer (quita signos de puntuación), lowercase and, optionally, remove stopwords
simple - breaks text into terms whenever it encounters a character which is not a letter
keyword - simply indexes the text exactly as is
Others include: whitespace, stop, pattern, language, and more are described in the docs at https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-analyzers.html
The built-in analyzers can work great for many use cases, but often you may need to define your own analyzers

Generalmente probaremos con nuesto dataset los distintos analyzers para determinar cual nos viene mejor.
Tal vez tendremos que usar multifields para usar distintos analyzers en determinados campos.

# Custom analyzer
Podemos definirlo para un índice.
  Definiremos las stopwords
  El tokenizer que queremos usar.
  Y los filters a aplicar: es importante el orden de los filters. Ejemplos de filtros que pondremos: lowercase, stopwords (que ya habremos definidos)

Ejemplo:
PUT blogs_test
{
  "settings": {
    "analysis": {
      "char_filter": {
        "xpack_filter": {
          "type": "mapping",
          "mappings": ["X-Pack => XPack"]
        }
      },
      "analyzer": {
        "my_content_analyzer": {
          "type": "custom",
          "char_filter": ["xpack_filter"],
          "tokenizer": "standard",
          "filter": ["lowercase"]
        }
      }
    }
  },
  "mappings": {
    "_doc": {
      "properties": {
        "content": {
          "type": "text",
          "analyzer": "my_content_analyzer"
        }
      }
    }
  }
}


# Anatomia de un analyzer
Character filters -> tokenizer -> token filters


## Character filters

### Mappings
Convertir cosas (tiene que ser exacto), por ejemplo: X-Pack => XPack


### Synonyms
"filter" : {
  "synonym" : {
    "type" : "synonym",
    "synonyms" : [
        "i-pod, i pod => ipod",
        "universe, cosmos"
      ]
    }
  }
}


"filter" : {
  "synonym" : {
    "type" : "synonym",
    "synonyms_path" : "analysis/synonym.txt"
  }
}


# Analyze API
Podemos probar que hace un analyzer determinado para una frase que pasemos

GET _analyze
{
 "analyzer": "simple",
 "text": "My favorite movie is Star Wars!"
}
