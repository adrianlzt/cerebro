https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html

GET /_search
{
    "query": {
        "regexp":{
            "name.first": "s.*y"
        }
    }
}
