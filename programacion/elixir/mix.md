Utilidad para gestionar proyectos, tests, paquetería y también se pueden definir aliax en el fichero mix.exs

Crear nuevo proyecto (crea directorio con la típica estructura y un scaffold de test):
mix new day5

Mirar comandos disponibles:
mix help

Mostrar dependencias:
mix deps

Bajarlas:
mix deps.get

Compilar dependencias:
mix deps.compile

Compilar una dep en particular:
mix deps.compile opentelemetry_api

Borrar compilaciones y deps bajadas:
mix deps.clean

Ver cuales tenemos desactualizadas:
mix hex.outdated
  Update possible:
    yes, actualización compatible con la versión declarada en mix.lock

Actualizar las deps
mix deps.update --all
