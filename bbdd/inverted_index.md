https://en.wikipedia.org/wiki/Inverted_index
https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html

Al indexar los datos se crean índices de cada "palabra" del documento apuntando al documento original.
Esto se realiza para poder hacer búsquedas "full text".

ElasticSearch/Lucene usa esta tecnonología.

Elasticsearch uses a structure called an inverted index, which is designed to allow very fast full-text searches. An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.
