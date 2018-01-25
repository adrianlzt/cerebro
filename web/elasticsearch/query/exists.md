https://www.elastic.co/guide/en/elasticsearch/guide/current/_dealing_with_null_values.html

GET /my_index/posts/_search
{
    "query" : {
        "constant_score" : {
            "filter" : {
                "exists" : { "field" : "tags" }
            }
        }
    }
}
