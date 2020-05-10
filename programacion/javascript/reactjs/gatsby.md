Gatsby se monta encima de react para generar web estáticas, basando el fetch de sus datos en una api graphQL.
También puede generar webs dinámicas (páginas que solo existen en el cliente).
Tendremos distintas páginas, unidas por <Link>, pero que se cargarán sin necesidad de un reload del navegador.
También podemos usar fetch, apollo u otras cosas para cargar datos dinámicamente.


Usádolo con los components de Elastic
npm install -g gatsby-cli
gatsby new my-eui-starter https://github.com/elastic/gatsby-eui-starter
cd my-eui-starter
gatsby develop
  Usa gatsby-browser.js para wrappear todo con ./src/components/chrome/chrome

http://localhost:8000/___graphql
Tendremos montada la interfaz web de kibana
Podemos buscar en el repo de kibana como se usan distintos componentes.


En http://localhost:8000/___graphql
Tendremos un graphql para obtener datos sobre la estructura de nuestra app
Para tener GraphQL playgroun, en vez de grahiql, substituir en el package.json
"develop": "GATSBY_GRAPHQL_IDE=playground gatsby develop",


# Config
gatsy-config.js
Aquí se definen los plugins a usar.
También podemos usar siteMetadata para almacenar key-values que luego podemos usar en las páginas, ejemplo, el título de la web, author, etc.


# Pages
No es una SPA.
Cada página en src/pages (ej.: src/pages/about.tsx) será una página distinta, accesible desde localhost:8000/about
Empezaremos a editar en src/pages/index.tsx (que sería como el index.html)

Cada página tendrá un export de un componente, que será lo que renderice gatsby

Para movernos entre páginas:
import { Link } from "gatsby"
<Link to="/contact/">Contact</Link>
Esto nos mueve entre páginas sin recarga y también hace precarga para que sea más instantáneo.


Crear páginas dinámicamente en build time: https://www.gatsbyjs.org/docs/node-apis/
Mirar sección APIs



## Dynamic pages
https://www.gatsbyjs.org/docs/data-fetching/
Gatsby por defecto es un generador de sitios estáticos.
Si queremos tener contenido dinámico tenemos que usar ciertas funcionalidades especiales.

### useState and useEffect
Para obtener contenido dinámico antes de cargar la página.


### dynamic apps / router
https://www.gatsbyjs.org/docs/client-only-routes-and-user-authentication/

https://www.youtube.com/watch?v=RVNC61rkFxw
https://github.com/benawad/gatsby-typescript-app-starter/

https://www.gatsbyjs.org/docs/routing/
Para movernos entre páginas dinámicas usaremos reach/router
yarn add @reach/router

Con el router generamos el link hacia una web que no existe, diciendo que component se usará para renderizar.
Luego tendremos que usar la api onCreatePage para que se cree dinámicamente esa página.
<MyRouter> <RandomPerson path="/app/random-person/:results" /> </MyRouter>

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"
    createPage(page)
  }
}


# Apollo
Podemos usar apollo-client para obtener contenido dinámico de terceros via GraphQL
yarn add apollo-boost @apollo/react-hooks graphql apollo-link-ws apollo-client apollo-cache apollo-link subscriptions-transport-ws babel-plugin-remove-graphql-queries






# Components
Los crearemos en src/components/foo.tsx

Estructura básica:
import React from 'react';

const Card = ({ name }) => {
  return (
    <h1>hola {name} foo</h1>
  )
}

export default Card


Uso:
import DataCard from '../components/data_card'
...
<DataCard name="pepe" />


Los importaremos en las pages:
import Header from "../components/header"
 ...
 <Header />


## Layout components
https://www.gatsbyjs.org/tutorial/part-three/#creating-layout-components

Componentes compartidos entre distintas páginas
Generalmente, el hader, barra de navegación, etc



## Hooks
https://alligator.io/gatsbyjs/react-hooks-gatsby/





# Style / CSS
https://www.gatsbyjs.org/tutorial/part-two/

CSS modules: https://www.gatsbyjs.org/tutorial/part-two/#css-modules



# Plugins
https://www.gatsbyjs.org/tutorial/part-three/#using-plugins
https://www.gatsbyjs.org/plugins/

Para usar third parties como data sources.
Para poner reCAPTCHA
Fonts
Y muchas cosas más



# Build
gatsby build

genera una página estática (html+js) en public/ que será lo que pongamos en producción



# GraphQL
Tiene integrado GraphQL.
En el modo desarrollo tenemos GraphiQL en
http://localhost:8000/__graphql
Podemos usarlo para ver las queries que queremos hacer.

En vez de GraphiQL podemos usar GraphiQL playground, que es más moderno e intuitivo.
Arrancar el server de desarrollo con (podemos meterlo en el package.json:
GATSBY_GRAPHQL_IDE=playground gatsby develop


Una vez tenemos la query lista, la movemos a JSX


import  {graphql, UseStaticQuery ] from "gatsby";
...
const data = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`)

Esto de site.siteMetadata es lo que definimos en el fichero de config.
Ese "graphql" es una función que convierte el texto en un formato especial para que se lo trague la otra función.

Para user el título haremos:
{data.site.siteMetadata.title}


Un uso típico será iterar sobre un array para pintar cosas:
{data.blog.posts.map(post => (<...



# APIs
https://www.gatsbyjs.org/docs/api-reference/

## Node
https://www.gatsbyjs.org/docs/node-apis/
Nos permite crear nodos (cosas) en la capa de datos (graphql)

Tenemos que meter lo que queremos en el fichero: gatsby-node.js


# Await/async
ReferenceError: regeneratorRuntime is not defined
https://github.com/gatsbyjs/gatsby/issues/341

Instalar babel-polyfill

Meter lo del primer comentario en gatsby-node.js


Meter donde se use async/await:
import 'regenerator-runtime/runtime';

