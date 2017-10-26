https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html

GET /_search
{
    "query": {
        "regexp":{
            "name.first": "s.*y"
        }
    }
}


CUIDADO!
Executing regex searches can be quite expensive, since Elasticsearch possibly has to compare every inverted index entry to the regex, which can take some while. If you can go without regex and use one of the other query types, you should do so.
