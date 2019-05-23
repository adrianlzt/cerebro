http://redsymbol.net/articles/unofficial-bash-strict-mode/

set -e           # exit in some command fails
set -u           # exit if it tries to use some var undefined
set -o pipefail  # exit if some command on a pipe fails

-e: fallar si alguna ejecuccion falla
-u: fallar si intentamos usar alguna variable no definida
pipefail: fallar si algun elemento en una cadena de pipes falla
