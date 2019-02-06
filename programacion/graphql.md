http://graphql.org/

Es un lenguaje para accede a los datos de tu api.
Le pasamos los datos que queremos obtener con una especie de json.

En el servidor se mapea cada cosa a los objetos reales y nos devuelve lo que queremos.

GraphiQL interfaz gráfico que nos monta el server de GraphQL (cualquiera de las lib que usemos), que nos ayuda a construir las queries, muestra resultados y enseña la doc.
Si usamos queries anóminas ("{ nombreFunc { param1 } }") se quejará si tenemos escrita más de una.


# Queries
query NombreQuery {
  funcionQuePodemosLanzar (param1: 2, param2: 3) {
    param1
    param2
    objetoHijo {
      paramHijo1
    }
  }
}


Ejemplo con el server de Postgraphile apuntando sobre la bbdd de zabbix.
Obtenemos los triggers de los items "vfs.file.cksum[/etc/passwd]" de los 20 primeros hosts.
query Triggers {
  allHosts (first:20, offset:0) {
    nodes {
      host
      itemsByHostid (condition: {key_:"vfs.file.cksum[/etc/passwd]"}) {
        nodes {
          name
          functionsByItemid {
            nodes {
              triggerByTriggerid {
                description
                triggerid
              }
            }
          }
        }
      }
    }
  }
}
