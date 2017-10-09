https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-request-source-filtering.html

Solo mostrar ciertos campos:
{
  "_source" : "mes.*",


  "_source" : [ "mes.*", "name" ],


"_source": {
    "includes": [ "obj1.*", "obj2.*" ],
    "excludes": [ "*.description" ]
},



Mostrar campos tras pasar por un script:
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-script-fields.html

doc['xxx'] VS params['_source']['xxx']
Usar doc siempre que podamos. No útil cuando queremos devovler objetos analyzed o con varios terms.
_source es muy lento, debe parsearse cada vez que se usa.


Si estamos usando curl y estamos envolviendo el json con comillas simples, poner el campo dentro de "doc" o "params" con comillas dobles escapadas:
curl ... -d '{ ..., "script": "doc[\"xxx\"]" ...}

{
    "query" : {
        "match_all": {}
    },
    "script_fields" : {
        "test1" : {
            "script" : {
                "lang": "painless",
                "source": "doc['my_field_name'].value * 2"
            }
        },
        "test2" : {
            "script" : {
                "lang": "painless",
                "source": "doc['my_field_name'].value * factor",
                "params" : {
                    "factor"  : 2.0
                }
            }
        }
    }
}


{
    "query" : {
        "match_all": {}
    },
    "script_fields" : {
        "test1" : {
            "script" : "params['_source']['message']"
        }
    }
}
