https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl-range-query.html

Ejemplos:
now-1h
now+1d
now+1h+30m
2018-01-15||+1M (la fecha mas un mes)

"lte": "2017-05-31"
Esto matchara todos los documentos de ese día, da igual la hora


Estas búsquedas tendrán un scoring binario (1 si aparecen)

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
