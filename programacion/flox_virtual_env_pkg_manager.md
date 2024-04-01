https://flox.dev/docs/
foro: https://discourse.flox.dev/

https://news.ycombinator.com/item?id=39692801
Hablan también de más alternativas similares


Flox is a virtual environment and package manager all in one. With Flox you create development environments that layer and provide dependencies just where it matters (Flox won't mess with your setup!), making them portable across the full software lifecycle.

Usa Nix para crear un entorno de desarollo.
Nos permite definir un entorno de desarrollo en un archivo de configuración y luego crearlo con un solo comando.

Por ejemplo, podemos definir la versión de python a usar e instalar una versión de postgres.
También comandos de ayuda tipo jq, curl, etc.


En un directorio donde tengamos nuestro proyecto, inicializar con
flox init

Flox intentará detectar que tipo de proyecto es y creará un archivo flox.yml con la configuración básica.
Por ejemplo, puede detectar que tenemos poetry o node.


Para buscar paquetes:
flox search <package>

Listar los paquetes instalados:
flox list

Para añadir dependencias:
flox install <package>

Borrar dependencias:
flox uninstall <package>


Cargar el entorno de desarrollo:
flox activate


Fichero donde se almacena la configuración:
.flox/env/manifest.toml

Para editar ese fichero usar:
flox edit

Esquema del fichero:
https://flox.dev/docs/reference/command-reference/manifest.toml/


Crear un contenedor a partir de las dependencias:
flox containerize
Crea un .tar.gz que podemos cargar en docker con:
docker load -i flox-container.tar.gz

En el arranque intentará ejecutar los scripts que tengamos configurados.

El código está en https://github.com/flox/flox/blob/main/cli/flox-rust-sdk/src/models/container_builder.rs#L7

Si vemos lo que ejecuta por debajo veremos algo tipo:
/nix/store/qp5zys77biz7imbk6yy85q5pdv7qk84j-python3-3.11.6/bin/python3.11 /nix/store/zlp6m7f2zrkfcdavrr1qv518h4k7ldrz-stream /nix/store/ay200cxkkhajvdjc3cfx3cxi0y3d5fl7-flox-env-container-conf.json

Y ese fichero json tiene una estructura tipo:
```
{
  "architecture": "amd64",
  "config": {
    "Cmd": [
      "-i",
      "/nix/store/x88ivkf7rmrhd5x3cvyv5vh3zqqdnhsk-bash-interactive-5.2-p15/bin/bash --rcfile /nix/store/g9bml3klg0jl65s54n70jcn94ysf7giq-environment/activate/bash"
    ],
    "Entrypoint": [
      "/nix/store/x88ivkf7rmrhd5x3cvyv5vh3zqqdnhsk-bash-interactive-5.2-p15/bin/bash",
      "-c"
    ],
    "Env": [
      "BASH_ENV=/nix/store/g9bml3klg0jl65s54n70jcn94ysf7giq-environment/activate/bash",
      "FLOX_ENV=/nix/store/g9bml3klg0jl65s54n70jcn94ysf7giq-environment",
      "FLOX_PROMPT_COLOR_1=99",
      "FLOX_PROMPT_COLOR_2=141",
      "FLOX_PROMPT_ENVIRONMENTS=floxenv",
      "FLOX_SOURCED_FROM_SHELL_RC=1",
      "_FLOX_ACTIVE_ENVIRONMENTS=[]"
    ]
  },
  "os": "linux",
  "store_dir": "/nix/store",
  "from_image": null,
  "store_layers": [
    [
      "/nix/store/3dfyf6lyg6rvlslvik5116pnjbv57sn0-libunistring-1.1"
    ],
    [
      "/nix/store/a3n1vq6fxkpk5jv4wmqa1kpd3jzqhml9-libidn2-2.3.4"
    ],
    ...
  ],
  "customisation_layer": "/nix/store/flql8j5irwyld3c63smig0ngd8rwrk37-flox-env-container-customisation-layer",
  "repo_tag": "flox-env-container:ay200cxkkhajvdjc3cfx3cxi0y3d5fl7",
  "created": "1970-01-01T00:00:01+00:00"
}


# Errores

## Problemas con poetry
Si algún paquete de poetry no linka bien con alguna librería en C, puede ser porque poetry ha cacheado algún build local (fuera de nix) usando alguna otra librería de C.
Borrar de la cache de poetry (~/.cache/pypoetry) y volver a cargar el entorno para que haga el build del paquete usando las librerías de nix.

## Faltan libs al compilar
Comprobar que tenemos instalada una versión "wrapped" de gcc.
La "gcc-unwrapped" no vale, porque no mete las librerías en el path de nix.
```
