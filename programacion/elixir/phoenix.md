Framework para web apps
https://www.phoenixframework.org/


Arrancar:
mix phx.server


Ejemplo de app (tipico books CRUD)
https://github.com/mateus-araujo/elixir-phoenix-rest-api


# Dashboard
Mucha info de como está corriendo el server


# Routing
Ver las rutas configuradas, viendo que path está asignado a que controller:
mix phx.routes


# Generar código
https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Html.html
Generates controller, views, and context for an HTML resource.
mix phx.gen.html Accounts User users name:string age:integer

# Assets
Normalmente tendremos un dir assets/ con el css, js, node_modules, static files.
Lo compilaremos entrando y ejecutando:
npm install



# LiveView
https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html
https://www.viget.com/articles/what-is-phoenix-liveview/
  explicación sencilla del concepto y funcionamiento

Crear aplicaciones web reactivas usando únicamente elixir.
Las aplicaciones se crean de manera declarativa (diciendo que queremos mostrar) y Phoenix se encarga de modificarlas según se modifiquen las variables.
Es la misma idea que con ReactJS.

Se definen la variables dinámicas en el template y phoenix se encarga de la actualización vía javascript.

LiveView carga una librería JS en el navegador del cliente que abre una conexión websockets scontra el servidor para obtener esas modificaciones en tiempo real.
También las operaciones que realicemos en la página web (presionar botones por ejemplo) se enviarán al servidor vía websockets.


## Ejemplos
https://phoenixphrenzy.com/results
https://github.com/razuf/elixir-phoenix-liveview-realworld
https://github.com/dwyl/phoenix-liveview-counter-tutorial
  nos cuenta como crear el ejemplo paso a paso

https://github.com/joelparkerhenderson/demo-elixir-phoenix
  app con phoenix y ecto (ORM). Modelo MVC simple para crear usuarios.
