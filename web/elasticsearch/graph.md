https://www.elastic.co/guide/en/kibana/6.5/xpack-graph.html

API e interfaz web (kibana) para encontrar relaciones entre documentos.
Solo disponible bajo la licencia Platinum https://www.elastic.co/subscriptions (Elasticsearch -> Query & Analytics -> Graph exploration API. Kibana -> Explore & Visualize -> Graph analytics)

Los vértices son términos de los documentos.
Los documentos son las uniones entre los vértices.

Podemos usar un alias para apuntar a varios índices y usar términos con el mismo key en distintos índices para lograr unir términos en documentos de índices distintos.


El contenido de la key de los vértices no puede superar los 512 caracteres. Si lo hacemos no nos la devolverá la API de graph (tiene pinta que tien que ver con el límite de 512 caracteres que se mete a los keyword)
https://github.com/elastic/elasticsearch/blob/237650e9c054149fd08213b38a81a3666c1868e5/x-pack/plugin/core/src/main/java/org/elasticsearch/xpack/core/ml/utils/MlStrings.java#L67 ¿es esto?


# API
Ejemplo de query simple para obtener vertices

GET postgresql_queries/_xpack/graph/_explore
{
	"controls": {
		"use_significance": false,
		"sample_size": 1000,
		"timeout": 5000
	},
	"vertices": [
		{
			"field": "tag.query",
			"size": 5,
			"min_doc_count": 1,
			"shard_min_doc_count": 1
		}
	]
}



# Kibana
Los graphs se almacenan en:
GET .kibana/_search
{
  "query": {
    "match": {
      "type": "graph-workspace"
    }
  }
}



# Ejemplo enlazando índices
# Doc ejemplo generado por telegraf-postgres
POST postgresql_queries/_doc
{
  "@timestamp": "2018-11-20T11:52:30+01:00",
  "tag": {
    "db": "zabbix-server",
    "query": "select pg_sleep(109999);",
    "usename": "zabbix-server",
    "ip_port": "1.1.1.1:1234"
  }
}

# Doc ejemplo netstat-telegraf en zabbix web
POST telegraf_netstat_facts/_doc
{
  "@timestamp": "2018-11-20T15:36:00Z",
  "tag": {
    "pid_php": "2126",
    "ip_port": "1.1.1.1:1234"
  }
}

# Doc ejemplo log php-fpm
POST php-fpm/_doc
{
  "@timestamp": "2018-11-20T15:36:00Z",
  "tag": {
    "pid_php": "2126"
  },
  "clientip": "10.201.2.14",
  "request": "/jsrpc.php?output=json-rpc"
}

POST _aliases
{
  "actions": [
    {
      "add": {
        "index": "telegraf_netstat_facts",
        "alias": "graph_zabbixweb_postgresql"
      }
    },
    {
      "add": {
        "index": "php-fpm",
        "alias": "graph_zabbixweb_postgresql"
      }
    },
    {
      "add": {
        "index": "postgresql_queries",
        "alias": "graph_zabbixweb_postgresql"
      }
    }
  ]
}





# JSON con el graph de kibana
{
  "indexPattern": "graph_zabbixweb_postgresql",
  "selectedFields": [
    {
      "name": "tag.query.keyword",
      "lastValidHopSize": 5,
      "color": "#e4b4ea",
      "iconClass": "fa-cube",
      "hopSize": 5
    },
    {
      "name": "tag.ip_port.keyword",
      "lastValidHopSize": 5,
      "color": "#e7974c",
      "iconClass": "fa-bolt",
      "hopSize": 5
    },
    {
      "name": "tag.pid_php.keyword",
      "lastValidHopSize": 5,
      "color": "#67adab",
      "iconClass": "fa-exclamation",
      "hopSize": 5
    },
    {
      "name": "clientip.keyword",
      "lastValidHopSize": 5,
      "color": "#e4b4ea",
      "iconClass": "fa-user",
      "hopSize": 5
    }
  ],
  "blacklist": [],
  "vertices": [
    {
      "x": 515.294996093634,
      "y": 386.40325659598574,
      "field": "tag.query.keyword",
      "term": "select pg_sleep(109999);",
      "label": "select pg_sleep(109999);",
      "color": "#e4b4ea",
      "parent": null,
      "weight": 1,
      "size": 15
    },
    {
      "x": 434.8641065310776,
      "y": 326.11411680491767,
      "field": "tag.ip_port.keyword",
      "term": "1.1.1.1:1234",
      "label": "1.1.1.1:1234",
      "color": "#e7974c",
      "parent": null,
      "weight": 2,
      "size": 15
    },
    {
      "x": 357.6278589171221,
      "y": 268.27841448489977,
      "field": "tag.pid_php.keyword",
      "term": "2126",
      "label": "2126",
      "color": "#67adab",
      "parent": null,
      "weight": 2,
      "size": 15
    },
    {
      "x": 278.1675502435636,
      "y": 208.68730078649372,
      "field": "clientip.keyword",
      "term": "10.201.2.14",
      "label": "10.201.2.14",
      "color": "#e4b4ea",
      "parent": null,
      "weight": 1,
      "size": 15
    }
  ],
  "links": [
    {
      "weight": 0.4583333333333333,
      "width": 2.7272727272727275,
      "inferred": false,
      "source": 0,
      "target": 1
    },
    {
      "weight": 0.16666666666666666,
      "width": 2,
      "inferred": false,
      "source": 0,
      "target": 0
    },
    {
      "weight": 0.9166666666666666,
      "width": 10,
      "inferred": false,
      "source": 1,
      "target": 1
    },
    {
      "weight": 0.17343750000000002,
      "width": 5,
      "inferred": false,
      "source": 2,
      "target": 1
    },
    {
      "weight": 0.28671875,
      "width": 10,
      "inferred": false,
      "source": 2,
      "target": 2
    },
    {
      "weight": 0.04313366864807193,
      "width": 3.1210366694237663,
      "inferred": false,
      "source": 3,
      "target": 3
    },
    {
      "weight": 0.09213534522176495,
      "width": 6.666666666666666,
      "inferred": false,
      "source": 2,
      "target": 3
    }
  ],
  "urlTemplates": [
    {
      "url": "gapp/kibana#/discover?_a=(columns%3A!(_source)%2Cindex%3A%2749b829a0-ecb2-11e8-b813-bd0f6577d177%27%2Cinterval%3Aauto%2Cquery%3A{{gquery}}%2Csort%3A!(_score%2Cdesc))",
      "description": "Raw documents",
      "encoderID": "esq-rison-loose"
    }
  ],
  "exploreControls": {
    "useSignificance": false,
    "sampleSize": 7001,
    "timeoutMillis": 5000,
    "sampleDiversityField": null,
    "maxValuesPerDoc": 1,
    "minDocCount": 1
  }
}

