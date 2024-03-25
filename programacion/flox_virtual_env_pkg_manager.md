https://flox.dev/docs/
foro: https://discourse.flox.dev/

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
