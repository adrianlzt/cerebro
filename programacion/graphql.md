http://graphql.org/
https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png
  cheatsheet

Es un lenguaje para accede a los datos de tu api.
Le pasamos los datos que queremos obtener con una especie de json.

En el servidor se mapea cada cosa a los objetos reales y nos devuelve lo que queremos.

GraphiQL interfaz gráfico que nos monta el server de GraphQL (cualquiera de las lib que usemos), que nos ayuda a construir las queries, muestra resultados y enseña la doc.
Si usamos queries anóminas ("{ nombreFunc { param1 } }") se quejará si tenemos escrita más de una.

Mejor que GraphiQL, graphql-playground: https://www.npmjs.com/package/graphql-playground-react
Tambien como app de escritorio:
  yay -S graphql-playground-electron
Generalmente configuraremos un fichero .graphqlconfig especificando como acceder a la API. Ejemplos y cli para crearlo: https://github.com/prisma/graphql-config


# Schema
Editor online para ayudar a crear schemas de forma gráfica
https://graphqleditor.com/
Luego nos monta un backend fake donde podemos lanzar consultas con GraphiQL
Parece que no nos permite meter funciones dentro de types. Todas las cuelga de "type Query"

Esquema de ejemplo generado por Postgraphile para la bbdd de zabbix 3.2: graphql_zabbix.schema

Utilidad para trabajar con el schema:
sudo npm install -g graphql-cli

graphql lint
  chequear el schema en busca de errores


## Doc
Podemos meter comentarios sobre todos los elementos tipo
"""
Multilinea
"""
type pepe {
  "Linea doc"
  param ...
}

## Type
Elemento básico. Como un struct de go

## Interfaces
Mismo concepto que en programación. Declaran variables comunes que tendrán las implementaciones

## Union
Parecido a las interfaces, pero uniendo varios tipos con distintas variables.
Luego el cliente tendrá que pasar un pequeño código para saber que tipo es y actuar en consecuencia

Ejemplo donde unimos en una variable todos los posibles enums de varios types
union Subclasses = SubclassDatabase | SubclassOS

No podemos hacer unions de enums (parece). Tendremos que hacerlo de types que dentro usen el enum


## Input
Lo usamos para crear cosas o pasar varios parámetros a una función
Es como pasar un diccionario en vez de una simple variable.


# Queries
query NombreQuery {
  funcionQuePodemosLanzar (param1:2, param2:{some:more, complex:param}) {
    alias1:param1
    param2
    objetoHijo (paramHijo:23) {
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



# PostgreSQL
Postgraphile nos genera una API GraphQL encima de una bbdd postgres, analizando automáticamente las relaciones y creando todo el schema necesario para consultar y crear.

npx postgraphile -c postgres://graphql@localhost/zabbix-server

Obtener el schema generado:
npx postgraphile -c postgres://graphql@localhost/zabbix-server -X --export-schema-graphql schema.graphql



# Golang

## gqlgen
https://gqlgen.com/getting-started/
Nos genera el código a partir de un schema

Guardar una copia del resolver.go, para en siguientes modificaciones del schema ver que está modificando.

Tal vez tengamos que modificar algunos modelos para adecuarse a lo que necesitamos. Por ejemplo, definir que un parámetro es una función en vez de un struct:
https://gqlgen.com/getting-started/#create-the-database-models
Ejemplo definiendo otro modelo:
models:
  Item:
    model: gitlab.opensolutions.cloud/opensolutions/odiegraphql.Item

Si queremos regenerar el código para otro nuevo schema:
mv resolver.go resolver.go.back; go run scripts/gqlgen.go -v

Si tenemos que inicializar un server lo haremos en server/server.go y pasaremos el objecto al Resolver{} que se crea para el Handle de /query

Si documentamos el schema, podemos regenerar el código con:
go run scripts/gqlgen.go -v
Lo meterá en generated.go, que es desde donde lo leerá la api. El fichero resolver.go no se verá modificado.


Si el visor gráfico se queda pillado, revisar la consola de errores. Tal vez haya algún fallo en el schema.
