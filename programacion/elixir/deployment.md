https://hexdocs.pm/phoenix/deployment.html
mix release:
  https://github.com/elixir-lang/elixir/blob/master/lib/mix/lib/mix/release.ex
  https://github.com/elixir-lang/elixir/blob/master/lib/mix/lib/mix/tasks/release.ex
  https://github.com/elixir-lang/elixir/blob/master/lib/mix/lib/mix/tasks/release.init.ex

# Secrets
Generalmente se mapearan variables de entorno a variables del código en este fichero:
config/prod.secret.exs

En el momento de correr la app en prod se setearan esas venv


# Build
mix deps.get --only prod

Definiremos las varaibles de entorno que necesitemos (si queremos ponerlo en runtime mirar unas líneas más abajo)
export SECRET_KEY_BASE=$(mix phx.gen.secret)

MIX_ENV=prod mix compile

Si queremos poder definir variables de entorno en runtime, y no en el build como estamos haciendo ahora, mirar
https://hexdocs.pm/phoenix/releases.html#runtime-configuration
  mv config/prod.secret.exs config/releases.exs


Si usamos imágenes/js/css, etc:
npm run deploy --prefix ./assets
mix phx.digest


Ejecutar el server:
PORT=4001 MIX_ENV=prod mix phx.server



# Releases
https://hexdocs.pm/mix/Mix.Tasks.Release.html
https://hexdocs.pm/phoenix/releases.html
  ejemplo para phoenix

Generar una app autocontenida con la VM de erlang, elixir, dependencias y código.

El build debe hacerse en una máquina con el mismo OS, distribution y version.

MIX_ENV=prod mix release

Si estamos usando variables de runtime veremos:
  * using config/releases.exs to configure the release at runtime

Si usamos phoenix, para que arranque el server al arrancar la release:
Editar config/prod.secret.exs (o config/releases.exs) y descomentar la línea:
config :my_app, MyApp.Endpoint, server: true


Empaquetaremos el directorio _build/prod/rel/NOMBREAPP

Si necesitamos migraciones, tendremos que implementar un poco de código para luego poder ejecutarlas sin necesitar "mix".
https://hexdocs.pm/phoenix/releases.html#ecto-migrations-and-custom-commands
_build/prod/rel/my_app/bin/my_app eval "MyApp.Release.migrate"


Si queremos modificar la versión, lo haremos en mix.exs
Si cambiamos la versión, se generará una nueva release en _build/prod/rel/NOMBREAPP/releases

Podemos usar pkg_deb para generar automáticamente un .deb a partir de la release


## Version
Podemos forzar la versión con
mix release --version A.B.C


# Contenedores
https://hexdocs.pm/phoenix/releases.html#containers
