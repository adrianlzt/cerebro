Buscar:
GET test_ranges/_search{
  "query": {
    "range": {
      "publish_range": {
        "gte": "2018-04-01"
      }
    }
  }
}

Cuando usamos una query "range" podemos definir el campo "relation" a uno de estos valores:
 - intersects (default): si algun documento se encuentra en el rango definido por la búsqueda hará match
 - contains: solo se hace match si un documento contiene el rango completo
 - within: solo se hace match si un doc está completamente dentro del rango definido


