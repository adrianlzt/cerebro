https://github.com/graph-gophers/graphql-go
CORS: https://github.com/graph-gophers/graphql-go/issues/74#issuecomment-289098639

https://github.com/graphql-go/graphql


# GQLgen
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



# Ejemplos de subscriptions en go
Ejemplo de un server en go implementando subscriptions.
Levanta también un graphql playground para hacer pruebas (http://localhost:8080/graphql)
https://github.com/graphql-go/graphql/issues/49#issuecomment-404909227

Ejemplo co Go + React:
https://github.com/adrianlzt/graphql-subscription-go-reactjs


# Errores

## "must not be null" al intentar obtener el schema
El playground falla al intentar cargar el schema (lo vemos en la consola del navegador).
Puede ser porque no tengamos definido ninguna función Query.
Podemos definir una dummy como:
type Query {
  version: String!
}

