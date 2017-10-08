https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-request-source-filtering.html

Solo mostrar ciertos campos:
{
  "_source" : "mes.*",


  "_source" : [ "mes.*", "name" ],


"_source": {
    "includes": [ "obj1.*", "obj2.*" ],
    "excludes": [ "*.description" ]
},
