Busqueda agregando por el campo "verb".
También tiene restricción por tiempo

curl localhost:9200/indices-2015.06.11/_search/?pretty -d '{ "query": { "filtered": { "query": { "query_string": { "analyze_wildcard": true, "query": "*" } }, "filter": { "bool": { "must": [ { "range": { "@timestamp": { "gte": 1433937600000, "lte": 1434027599999 } } } ], "must_not": [] } } } }, "size": 0, "aggs": { "http_verbs": { "terms": { "field": "verb" } } } }'

JSON expandido
{
    "query": {
        "filtered": {
            "query": {
                "query_string": {
                    "analyze_wildcard": true,
                    "query": "*"
                }
            },
            "filter": {
                "bool": {
                    "must": [
                        {
                            "range": {
                                "@timestamp": {
                                    "gte": 1433937600000,
                                    "lte": 1434027599999
                                }
                            }
                        }
                    ],
                    "must_not": []
                }
            }
        }
    },
    "size": 0,
    "aggs": {
        "http_verbs": {
            "terms": {
                "field": "verb"
            }
        }
    }
}

Salida:
      "buckets" : [ {
        "key" : "get",
        "doc_count" : 42052




Metiendo un script:
curl localhost:9200/iris-telematics-2015.06.11/_search/?pretty -d '{ "query": { "filtered": { "query": { "query_string": { "analyze_wildcard": true, "query": "*" } }, "filter": { "bool": { "must": [ { "range": { "@timestamp": { "gte": 1433937600000, "lte": 1434027599999 } } } ], "must_not": [] } } } }, "size": 0, "aggs": { "ADRI": { "terms": { "field": "verb", "script": "_value+\"pepe\"" } } } }'

    "aggs": {
        "ADRI": {
            "terms": {
                "field": "verb",
                "script": "_value+\"pepe\""
            }
        }
    }

Salida:
      "buckets" : [ {
        "key" : "getpepe",
        "doc_count" : 42052



En el script se puede poner doc[\"cosa\"].value para acceder a valores del documento.
Lo que devolvamos en el script será el valor de la "key"
