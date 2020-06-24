http://graphql.org/
https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png
  cheatsheet
https://relay.dev/graphql/connections.htm
  pagination best practices

Es un lenguaje para accede a los datos de tu api.
Le pasamos los datos que queremos obtener con una especie de json.
El formato sigue a una base de datos de grafos, con nodos (que contienen los datos) y edges que nos llevan a otros nodos.

En el servidor se mapea cada cosa a los objetos reales y nos devuelve lo que queremos.

GraphiQL interfaz gráfico que nos monta el server de GraphQL (cualquiera de las lib que usemos), que nos ayuda a construir las queries, muestra resultados y enseña la doc.
Si usamos queries anóminas ("{ nombreFunc { param1 } }") se quejará si tenemos escrita más de una.

Mejor que GraphiQL, graphql-playground: https://www.npmjs.com/package/graphql-playground-react
Tambien como app de escritorio:
  yay -S graphql-playground-electron
Generalmente configuraremos un fichero .graphqlconfig especificando como acceder a la API. Ejemplos y cli para crearlo: https://github.com/prisma/graphql-config
App online para conectar a una API de graphql:
https://www.graphqlbin.com/v2/new

# Ejemplos
Podemos probar con alguna de las APIs de graphql públicas:
https://github.com/APIs-guru/graphql-apis



# Schema
https://devhints.io/graphql
Cheatsheet: https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png

Editor online para ayudar a crear schemas de forma gráfica
https://graphqleditor.com/
Es de pago, la versión gratuita solo nos permite crear cosas públicas.
Luego nos monta un backend fake donde podemos lanzar consultas con GraphiQL
Parece que no nos permite meter funciones dentro de types. Todas las cuelga de "type Query"

Esquema de ejemplo generado por Postgraphile para la bbdd de zabbix 3.2: graphql_zabbix.schema

Utilidad para trabajar con el schema:
sudo npm install -g graphql-cli

graphql lint
  chequear el schema en busca de errores


Otra app web que autogenera código (TypeScript, Java y .net):
https://graphql-code-generator.com/

Unstructured data: https://github.com/graphql/graphql-js/issues/32
Parece que no hay mucha forma de gestionar esto. Meterlo en una string y poco más.


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


https://countries.trevorblades.com/
query {
  countries (filter: {code:{eq:"ES"}}) {
    name
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


## Parámetros / Query variables
También podemos pasar variables a las queries.

En graphql playground tendremos un menú abajo "Query variables" donde pondremos un JSON:
{
  "country_code": "ES"
}

query ($country_code: String){
  countries (filter: {code:{eq: $country_code}}) {
    name
  }
}



# Mutations
Sería el equivalente al POST/PUT/DELETE de una API REST.
Para enviar cambios a la API.

Definición en el schema:
type Mutation{
  strengthCommand(
    params: StrengthCommand
  ): CommandResponse!
}
schema{
  query: Query,
  mutation: Mutation,
  subscription: Subscription
}



# Subscriptions
Para recibir cambios empujados por el server.
Típicamente se implementará con websockets por debajo.

Ejemplo de un server en go implementando subscriptions.
Levanta también un graphql playground para hacer pruebas (http://localhost:8080/graphql)
https://github.com/graphql-go/graphql/issues/49#issuecomment-404909227

Ejemplo co Go + React:
https://github.com/adrianlzt/graphql-subscription-go-reactjs

Ejemplo con apollo (nodejs)
https://github.com/the-road-to-graphql/fullstack-apollo-subscription-example


## Schema
type Subscription {
  postLikesSubscribe: [Post]
}

## "Query" para subscribirnos
subscription {
  postLikesSubscribe {
    likes
  }
}




# PostgreSQL
## Postgraphile
Postgraphile nos genera una API GraphQL encima de una bbdd postgres, analizando automáticamente las relaciones y creando todo el schema necesario para consultar y crear.

npx postgraphile -c postgres://graphql@localhost/zabbix-server

Obtener el schema generado:
npx postgraphile -c postgres://graphql@localhost/zabbix-server -X --export-schema-graphql schema.graphql


## Hasura
https://hasura.io/
También para conectar via graphql a una postgres



# Golang

https://github.com/graph-gophers/graphql-go
CORS: https://github.com/graph-gophers/graphql-go/issues/74#issuecomment-289098639

https://github.com/graphql-go/graphql


## GQLgen
https://gqlgen.com/getting-started/
Nos genera el código a partir de un schema
go get github.com/99designs/gqlgen

Podemos generar un esquelo de un proyecto:
go run github.com/99designs/gqlgen init

Modificaremos el schema: graph/schema.graphqls

Y regeneraremos el código (es seguro regenerar, no pisa nuestro código, aunque un commit no vendría mal, por si acaso):
gqlgen generate


Implementaremos las funciones que nos ha generado en:
graph/schema.resolvers.go

Si necesitamos inyectar cosas a los resolvers, lo haremos en graph/resolver.go (struct que implementa las funciones)


CORS: https://github.com/99designs/gqlgen/blob/master/docs/content/recipes/cors.md


Ejemplos de implementaciones:
https://outcrawl.com/go-graphql-realtime-chat
https://github.com/99designs/gqlgen/blob/412a72fe26b093b08d27e90adf0390ad0ea0a7ea/codegen/testserver/subscription_test.go

Para las subcription usaremos <-ctx.Done() para saber cuando han cerrado la conex



Tal vez tengamos que modificar algunos modelos para adecuarse a lo que necesitamos. Por ejemplo, definir que un parámetro es una función en vez de un struct:
https://gqlgen.com/getting-started/#create-the-database-models
Ejemplo definiendo otro modelo:
models:
  Item:
    model: gitlab.opensolutions.cloud/opensolutions/odiegraphql.Item



Si el visor gráfico se queda pillado, revisar la consola de errores. Tal vez haya algún fallo en el schema.
