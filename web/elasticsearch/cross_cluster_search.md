Hacer búsquedas en varios clusters al mismo tiempo.

# Registrar remote clusters
PUT _cluster/settings{
  "persistent": {
    "search.remote": {
      "germany_cluster": {
        "seeds": [
          "my_server:9300",
          "64.33.90.170:9300"
        ]
      }
    }
  }
}


# Búsqueda remota
GET germany_cluster: blogs/_search{
  "query": {
    "match": {
      "title": "network"
    }
  }
}


# Cross search
GET blogs,germany_cluster: blogs/_search {
  "query": {
    "match": {
      "title": "network"
    }
  }
}


Varios remotos:
GET blogs,*:blogs/_search


# Respuestas
En la respuesta (hits) vendrá especificado de donde viene la respuesta:
"_index": "germany_cluster:blogs"
