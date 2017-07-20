http://redsymbol.net/articles/unofficial-bash-strict-mode/

set -e
set -u
set -o pipefail

-e: fallar si alguna ejecucción falla
-u: fallar si intentamos usar alguna variable no definida
pipefail: fallar si algun elemento en una cadena de pipes falla
