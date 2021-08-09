https://opentelemetry.io/docs/erlang/getting-started/
https://github.com/open-telemetry/opentelemetry-erlang-contrib/issues/2
  aún vacío 28/7/2021
Mirar los ejemplos de implementación con geometrics.

# Ejemplo de app
mix new --sup elixir_dummy_otel
cd elixir_dummy_otel
Añadir a mix.exs
def deps do
  [
    {:opentelemetry_api, "~> 1.0.0-rc.1"},
    {:opentelemetry, "~> 1.0.0-rc.1"}
  ]
end

y la seccion releases a "project":

def project do
  [
  ¦ app: :elixir_dummy_otel,
  ¦ version: "0.1.0",
  ¦ elixir: "~> 1.12",
  ¦ start_permanent: Mix.env() == :prod,
  ¦ deps: deps(),
  ¦ releases: [
  ¦   otel_getting_started: [
  ¦   ¦ version: "0.0.1",
  ¦   ¦ applications: [otel_getting_started: :permanent]
  ¦   ]
  ¦ ],
  ]
end

mix deps.get

Crear config/runtime.exs y añadir:
use Mix.Config
config :opentelemetry, :processors,
  otel_batch_processor: %{
    exporter: {:otel_exporter_stdout, []}
  }


Crear lib/otel_getting_started.ex y añadir:
defmodule OtelGettingStarted do
  require OpenTelemetry.Tracer, as: Tracer

  def hello do
    Tracer.with_span "operation" do
      Tracer.add_event("Nice operation!", [{"bogons", 100}])
      Tracer.set_attributes([{:another_key, "yes"}])

      Tracer.with_span "Sub operation..." do
        Tracer.set_attributes([{:lemons_key, "five"}])
        Tracer.add_event("Sub span event!", [])
      end
    end
  end
end

Ejecutar con:
iex -S mix
> OtelGettingStarted.hello()

Veremos los spans en la misma consola



# Phoenix (mirar Geometrics)
https://github.com/opentelemetry-beam/opentelemetry_phoenix
Creo que lo van a migrar a https://github.com/open-telemetry/opentelemetry-erlang-contrib/issues/2
https://hexdocs.pm/opentelemetry_phoenix/OpentelemetryPhoenix.html

Metemos la dependencia en mix.exs
{:opentelemetry_phoenix, "~> 1.0.0-rc.2"},

En el fichero application.ex de nuestra app, antes de la función
def start(_type, _args) do
Añadiremos:
OpentelemetryPhoenix.setup()

No uso "OpenTelemetry.register_application_tracer(:this_otp_app)" porque me falla. Posiblemente porque no estoy entendiendo bien que debo pasar ahí.


# Ecto (mirar Geometrics)
Genera trazas para las llamadas a la base de datos.
Debemos inicializarlo en lib/nombre_app/application.ex con:
OpentelemetryEcto.setup([:nombre_de_nuestra_app, :repo])
  ":nombre_de_nuestra_app" es el nombre del directorio que tengamos en "lib/XXX".
  también podemos mirar el children de lib/nombre_app/application.ex, por ejemplo: DemoElixirPhoenix.Repo, lo convertimos en [:demo_elixir_phoenix, :repo]
  en apps umbrella podemos buscar quien gestiona ecto con:
    rg \.Repo -g "*application.ex"
    y usaremos esa app en la config del prefix.
  esto viene de como genera ecto los eventos: https://hexdocs.pm/ecto/Ecto.Repo.html#module-adapter-specific-events

Funciona uniendo un handler a telemetry: https://github.com/opentelemetry-beam/opentelemetry_ecto/blob/d4f8898f8eb782359a076355bc4f47adbda183a6/lib/opentelemetry_ecto.ex#L31
Cuando ecto genera un evento, se la pasa a la función handle_event de opentelemetry_ecto que genera un span


# Geometrics
Parece mejor usar esta lib, que integra tanto server side como client side.
También añade soporte para Phoenix LiveView y captura de excepciones (https://github.com/geometerio/geometrics/blob/main/guides/phoenix.md)
https://github.com/geometerio/geometrics/blob/main/guides/installation.md

Pasos para añadir geometrics, sin liveview:
 - lib en mix.exs
 - config en config/config.exs
   - para la parte de ecto (:geometrics, :ecto_prefix), debemos poner [:nombre_app, :repo], siendo nombre_app el nombre en snake case de nuestra app (mirar arriba la sección de opentelemetry_ecto
 - handler en lib/NOMBREAPP/application.ex
 - plug en lib/NOMBREAPP_web/router.ex (esto es para liveview?)

Para añadir traceo en el cliente, tenemos que añadir una parte al root template y otra al package.json de nuestra app
https://github.com/geometerio/geometrics/blob/main/guides/javascript.md#tracing-across-stack-boundaries

Lo correcto es:
"geometrics": "file:../deps/geometrics",

Ejemplo implementando geometrics en phoenix+liveview
https://github.com/adrianlzt/phoenix-liveview-counter-tutorial/tree/feature/opentelemetry

Ejemplo con geometrics en phoenix+ecto
https://github.com/adrianlzt/demo-elixir-phoenix/tree/feature/opentelemetry




# Errores

## warning: No traceContext on connect_params
Creo que es porque el cliente (navegador) no está enviando información de span en las peticiones.
Tal vez no hemos inicializado bien el tema del javascript?
O no hemos "traceado" la función JS.

Puede ser también por qué falte el plug en el router.exs


## otel_tracer_provider.register_application_tracer/1
== Compilation error in file lib/books_api/application.ex ==
** (MatchError) no match of right hand side value: :undefined
    (opentelemetry_api 0.5.0) src/otel_tracer_provider.erl:67: :otel_tracer_provider.register_application_tracer/1

Parece que es porque no tengo definido ni el vsn (version) ni modules.
Podemos comentar esas lineas en deps/opentelemetry_api/src/otel_tracer_provider.erl
Lo dejo como:
%% {ok, Vsn} = application:get_key(Name, vsn),
%%{ok, Modules} = application:get_key(Name, modules),
gen_server:call(?MODULE, {register_tracer, Name, "Vsn", "Modules"})

