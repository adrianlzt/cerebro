https://facebook.github.io/react/docs/installation.html

React is flexible and can be used in a variety of projects. You can create new apps with it, but you can also gradually introduce it into an existing codebase without doing a rewrite.

Para crear apps usar uno de estos dos:
Gatsby is a static site generator tool. A static site generator generates static HTML on build time. It doesn’t use a server.
Next.JS is mainly a tool for server-side rendered pages. It dynamically generates the HTML every time a new request comes in with the use of a server.




# Uso básico
https://github.com/facebook/create-react-app
npx create-react-app hello-world
cd hello-world

  yarn start
    Starts the development server.
    Abre un browser (localhost:3000) donde hay la app de ejemplo corriendo
    podemos modificar el codigo .js y la web se recargará automáticamente

  npm run build
    Bundles the app into static files for production.
    Genera en el directorio build/ los ficheros estáticos para servir (css y js)
    Podemos por ejemplo publicar la web en el hosting de github (https://pages.github.com/)

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!




A package manager, such as Yarn or npm. It lets you take advantage of a vast ecosystem of third-party packages, and easily install or update them.
A bundler, such as webpack or Browserify. It lets you write modular code and bundle it together into small packages to optimize load time.
A compiler such as Babel. It lets you write modern JavaScript code that still works in older browsers.
