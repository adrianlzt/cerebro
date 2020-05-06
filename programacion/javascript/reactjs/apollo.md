https://www.apollographql.com/docs/tutorial/introduction
Capa de datos entre nuestra app react y las fuentes de datos, definidas en GraphQL.

No es exclusivo de react, pero parece que es la solución por defecto para la "vista"

Es un modelo cliente-servidor.

# Servidor
Para el lado servidor tienen apollo-server, que contesta queries de GraphQL realizadas por el cliente.
Por debajo usa packages de apollo (por ejemplo apollo-datasource-rest) para recoger datos de otras fuentes y presentarlos mediante la API graphQL.
Por ejemplo, montamos una api graphql que por debajo obtiene datos de un API REST y una base de datos.
A estas fuentes de datos les llama data sources:
https://www.apollographql.com/docs/tutorial/data-source/
Estos datasources vienen con cacheo y deduplicación.


Luego toca escribir los "resolvers", que convierten las queries y mutations de graphql en llamadas a los data sources.

Al final nos queda algo así:
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
});


Luego te venden usar su Graph Manager
https://www.apollographql.com/docs/tutorial/production/#what-are-the-benefits-of-graph-manager
Que parece que recoge datos del uso que se está haciendo de tu graphql API y te ayuda a identificar las partes más lentas, hacer cambios, etc


# Cliente
apollo-client: A complete data management solution with an intelligent cache
react-apollo: The view layer integration for React that exports components such as Query and Mutation

Crear el cliente:
import { ApolloClient } from 'apollo-client';
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

Exponerlo a nuestros componentes de React:
import { ApolloProvider } from '@apollo/react-hooks';
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById('root')
);


Luego definiremos la query y el render de sus datos:
https://www.apollographql.com/docs/tutorial/queries/#fetching-a-list


Parece que también nos permite usar el mismo esquema para obtner datos locales como estado de la red, formularios, etc.
Parece que sustituye a Redux.
https://www.apollographql.com/docs/tutorial/local-state/
