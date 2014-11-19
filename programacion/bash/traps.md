http://redsymbol.net/articles/bash-exit-traps/

#!/bin/bash
scratch=$(mktemp -d -t tmp.XXXXXXXXXX)
function finish {
  rm -rf "$scratch"
}
trap finish EXIT


#!/bin/bash
trap 'echo trapped' TERM
while :
do
  sleep 1000
done

kill a secas envía TERM
Hay que enviar ese kill al subproceso sleep que se habrá creado

Si hacemos
./programa &
kill %1
Enviaremos la señal a todo el grupo del proceso, por lo que también al sleep
