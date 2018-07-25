https://www.elastic.co/guide/en/elasticsearch/reference/current/parent-join.html
Join datatype

Parent and child docs son docs diferentes del mismo índice.
Cuando indexemos cada documento le diremos que parte de la relacion es.
Podemos actualizar el parent sin tocar los childs y los childs sin tocar el parent.

Tiene un coste importante:
  parent and childs tienen que estar en el mismo shard (se usa el parent id para enrutar, por lo que tenemos que pasar en la indexacion el id del parent)
  tenemos que hacer join en search time

Tendremos que definir el mapping de manera específica.
PUT companies{
  "mappings": {
    "_doc": {
      "properties": {
        "my_join_relation": {
          "type": "join",
          "relations": {
            "company": "employee"
          }
        },
        ...
      }
    }
  }
}

company es el parent de employee (el indice se llama companies, pero podria llamarse data, no tiene que ver que el indice sea companies con que el parent sea company)
Solo se puede definir un join field, pero ese join field puede definir varias relaciones.


Indexar un parent doc:
PUT companies/_doc/c1{
  "company_name": "Stark Enterprises",
  "my_join_relation": {
    "name": "company"
  }
}

Otra forma más compacta (solo para parents):
PUT companies/_doc/c1{
  "company_name": "Stark Enterprises",
  "my_join_relation": "company"
}

Indexar child doc:
PUT companies/_doc/emp1?routing=c1{
  "first_name": "Tony",
  "last_name": "Stark",
  "my_join_relation": {
    "name": "employee",
    "parent": "c1"
  }
}


# Queries

## has_child
Obtener un parent que tiene un child de que matchea una query:
GET my_index/_search{
  "query": {
    "has_child": {
      "type": “relation_name”,
      "query": { }
    }
  }
}

Ejemplo, companies que tienen un empleado que se llame Stark:
GET companies/_search{
  "query": {
    "has_child": {
      "type": "employee",
      "query": {
        "match": {
          "last_name": "Stark"
        }
      }
    }
  }
}

Podemos poner "inner_hits" para obtener que child ha hecho el match (debajo de has_child/has_parent)


## has_parent
Devuelve los childs que están debajo de un parent.
GET my_index/_search{
  "query": {
    "has_parent": {
      "parent_type": “relation_name”,
      "query": { }
    }
  }
}

GET companies/_search{
  "query": {
    "has_parent": {
      "parent_type": "company",
      "query": {
        "match": {
          "company_name": "NBC"
        }
      }
    }
  }
}

Podemos poner "inner_hits" para obtener que child ha hecho el match (debajo de has_child/has_parent)

# Acceder a un child doc
Tenemos que especificar el routing (el id del parent)
GET companies/_doc/emp1?routing=c1


# Actualizar child doc
POST companies/_doc/emp1/_update?routing=c1 {
  "doc": {
    "first_name": "Anthony"
  }
}


# Kibana
No soporta parent/child
Parece que hay un plugin que lo permite.
Vega parece que si lo permite.
