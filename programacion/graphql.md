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

Ejemplo del schema de gitlab: https://gitlab.com/gitlab-org/gitlab/-/blob/6600d8dbd5e356c4419d6dabc0af4b434165424a/doc/api/graphql/reference/gitlab_schema.graphql



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

Los nombres de las queries/mutations/subscriptions deben tener el formato: /[_A-Za-z][_0-9A-Za-z]*/
https://spec.graphql.org/June2018/#Name
Case sensitive


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

### Arguments
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}

## Interfaces
Mismo concepto que en programación. Declaran variables comunes que tendrán las implementaciones

## Union
Parecido a las interfaces, pero uniendo varios tipos con distintas variables.
Luego el cliente tendrá que pasar un pequeño código para saber que tipo es y actuar en consecuencia

Ejemplo donde unimos en una variable todos los posibles enums de varios types
union Subclasses = SubclassDatabase | SubclassOS

No podemos hacer unions de enums (parece). Tendremos que hacerlo de types que dentro usen el enum

## Mutations
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

El tipo de dato que se puede pasar a Mutations son "inputs"
Generalmente llevarán el "!" para indicar que es obligatorio.
Mirar en su sección.



## Input
Lo usamos para crear cosas o pasar varios parámetros a una función
Es como pasar un diccionario en vez de una simple variable.

Si un input quiere usar otras estructuras de datos, esas estructuras también deben ser inputs.

input StrengthCommand{
  command: STRENGTH_COMMAND_TYPE
  """
  Value associated with some commands
  """
  value: Float
}

No podemos hacer polimorfismo con los inputs. Se está discutiendo en https://github.com/graphql/graphql-spec/pull/825

## enum
Una variable que solo pueda tomar unos valores determinados.

enum SPEED_COMMAND_TYPE{
  SIMULATE
  PAUSE
  RESTART
  RESET
  CALIBRATE
}


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


## Listas / arrays
{ friends:
    [ { name: "Luke Skywalker" },
      { name: "Han Solo" },
      { name: "R2D2" } ] }


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

Para la definición en el schema ir a dicha sección.

Para lanzar mutations.

Ejecutamos la mutation "createReview" y retornamos los valores "stars" y "commentary".
mutation {
  createReview(episode: "2", review: "muy malo") {
    stars
    commentary
  }
}

Usando variables:
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}


Otro ejemplo:
En el schema está definido como:
labelCreate(input: LabelCreateInput!): LabelCreatePayload

mutation {
  labelCreate (input: {title:"pruebaLabel", color: "#abcabc"}) {
    clientMutationId
    label {
      id
      updatedAt
    }
  }
}

Podemos enviar varias mutations en la misma petición:
mutation {
  topfolder: createFolder(repositoryIdentifier: "<objectStoreSymName>") { name }
  childfolder: createFolder(repositoryIdentifier: "<repoName>") { name }
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


# Errores
Parece que cada librería puede gestionar como se manejan los errores.
Por lo que he visto en la librería de Apollo y por pruebas con gqlgen (golang), al comenter un error (por ejemplo, poner mal la query), el server te devuelve un
422 Unprocessable Entity
Devuelve un JSON con:
{
  "errors":[
    {"message":"Cannot query fie..", "locations": [], "extensions": {"code": "XXX"}},
  ]
}

Otro tipo de errores son los que se devuelven en la función de la mutation, cuando la implementamos.
En este caso el código será 200 OK y el json tendrá, por ejemplo:
{"errors":[{"message":"mensaje de error","path":["addEvents"]}],"data":null}

La query no devolverá los datos que le hayamos pedido.

Por lo tanto, el cliente deberá chequear si en el json de respuesta existe un campo "errors", que indicará que existe algún error.



# Código
https://www.graphql-code-generator.com/

Generador de código para distintos lenguajes
Typescript
.net
java
etc



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
mirar en programacion/go/graphql.md
