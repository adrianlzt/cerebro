https://hexdocs.pm/elixir/master/Config.html

En los proyectos elixir encontraremos un directorio "config/" donde tendremos la configuración de la aplicación, generalmente separada por los distintos "environments": dev, test, stage, prod.

config/config.exs
fichero general, para todos los entornos
Al final suele llevar un import para cargar variables específicas de un entorno
import_config "#{Mix.env()}.exs"

config/runtime.exs
executed right before applications start

Estos ficheros llevarán como primera línea:
use Mix.Config
