https://www.elastic.co/guide/en/kibana/6.5/xpack-graph.html

API e interfaz web (kibana) para encontrar relaciones entre documentos.
Solo disponible bajo la licencia Platinum https://www.elastic.co/subscriptions (Elasticsearch -> Query & Analytics -> Graph exploration API. Kibana -> Explore & Visualize -> Graph analytics)


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

