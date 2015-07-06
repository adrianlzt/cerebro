http://www.elasticsearch.org

API centric & RESTful search engine.

JSON documented-oriented search engine
Built on top of Apache Lucene
Schema Free (no hace falta definir un esquema antes de meter los datos, como sería con SQL)
Multi-tenant data
Aggregations: powerful analytics


El primer nodo que arrancamos crea un cluster al que más nodos se pueden unir.
Los nodos abren una interfaz rest en el puerto 9200, y parece que el 9300 para comunicación del cluster.
