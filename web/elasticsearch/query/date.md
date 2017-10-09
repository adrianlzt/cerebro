https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl-range-query.html
{
    "query": {
        "range":{  
            "@timestamp":{  
               "gte":1507108818015,
               "lte":1507108877829,
               "format":"epoch_millis"
            }
        }
    }
}

{
    "query": {
        "range" : {
            "date" : {
                "gte" : "now-1d/d",
                "lt" :  "now/d"
            }
        }
    }
}

{
    "query": {
        "range" : {
            "born" : {
                "gte": "01/01/2012",
                "lte": "2013",
                "format": "dd/MM/yyyy||yyyy"
            }
        }
    }
}


{
    "query": {
        "range" : {
            "timestamp" : {
                "gte": "2015-01-01 00:00:00",
                "lte": "now",
                "time_zone": "+01:00"
            }
        }
    }
}
