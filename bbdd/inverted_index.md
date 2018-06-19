https://en.wikipedia.org/wiki/Inverted_index
https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html

Al indexar los datos se crean índices de cada "palabra" del documento apuntando al documento original.
Esto se realiza para poder hacer búsquedas "full text".

ElasticSearch/Lucene usa esta tecnonología.

Cada field crea un inverted index.

Parece que no es posible consultar como se almacena la información en estos inverted index.

Elasticsearch uses a structure called an inverted index, which is designed to allow very fast full-text searches. An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.


Una frase se para por el analyzer y luego se genera el indice invertido con cada word:

The lazy Brown
It fast and lazy

token | id
brown   1
fast    2
lazy    1,2
