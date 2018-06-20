https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html
https://www.elastic.co/guide/en/elasticsearch/guide/current/analysis-intro.html

Cuando se indexa y se busca se convierten las palabras a sus formas normalizadas (se coje la raíz).
zorros -> zorro
Zorro -> zorro

jumps/jumping -> jump

De esta manera conseguimos mejores búsquedas

También se eliminan las "stop words". Palabras no útiles, por ejemplo "the"


Se pueden crear sinónimos para nuestra casuística particular.



# Anatomia de un analyzer
Character filters -> tokenizer -> token filters

## Character filters
https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-charfilters.html
Nos sirve para transformar el stream de texto que le llegue al analyzer, quitando caracteres, convirtiendo strings a otras, etc

### mapping
Convertir cosas (tiene que ser exacto), por ejemplo: X-Pack => XPack

### pattern_replace
Reemplazar cosas según un patrón

### html_strip
Quitar codigos HTML y hacer urldecode


## Tokenizer
https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-tokenizers.html
Como trocear las palabras. Existen muchos tokenizers. Algunos interesantes:
standard: se usa por defecto, trocea por palabras y quita signos de puntuación.
uax_url_email: como el standard pero reconoce url y emails (los deja enteros)
parciales: trocean las palabas en trozos para poder hacer búsquedas parciales: quick -> [qu, ui, ic, ck] o [q, qu, qui, quic, quick]
pattern: usando regexp para trocear
path: /foo/bar/baz → [/foo, /foo/bar, /foo/bar/baz]


## Token filters
https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-tokenfilters.html
Coge los tokens dados por el tokenizer y realiza operaciones sobre ellos, por ejemplo:
lowercase: convierte a minúsculas
stop: elimina ciertas palabas (stopwords)
length: elimina palabras cuya longitud no entre en un rango
stemmer: obtiene las raices de las palabras (debe configurarse para un idioma determinado)
snowball: otro stemmer para distintos lenguages
synonym: almacenar todos los sinónimos como una misma palabra
asciifolding: convertir todo lo que llegue a ASCII


# Analyzers
https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-analyzers.html
Existen ya unos cuantos analyzers creados que cogen distintos char filters, tokenizer y token filters.
standard - which is the default analyzer
  no character filters, standard tokenizer (quita signos de puntuación), lowercase and, optionally, remove stopwords
simple - breaks text into terms whenever it encounters a character which is not a letter
keyword - simply indexes the text exactly as is
language: https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html
  es
Others include: whitespace, stop, pattern, language, and more are described in the docs at https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-analyzers.html
The built-in analyzers can work great for many use cases, but often you may need to define your own analyzers

Generalmente probaremos con nuesto dataset los distintos analyzers para determinar cual nos viene mejor.
Tal vez tendremos que usar multifields para usar distintos analyzers en determinados campos.

## Custom analyzer
Podemos definir analyzers propios dentro de índices.
Para ello tendremos que elegir:
  char filters
  tokenizer
  token filters (el orden es importante)



Ejemplo creando un analyzer y forzandolo para un field en el mapping:
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
https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-analyze.html
Podemos probar que hace un analyzer determinado para una frase que pasemos

GET _analyze
{
 "analyzer": "simple",
 "text": "My favorite movie is Star Wars!"
}

GET _analyze
{
  "tokenizer": "standard",
  "filter": ["lowercase","snowball"],
  "text": "This release includes mainly bug fixes."
}
