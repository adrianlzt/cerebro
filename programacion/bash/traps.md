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


# Ejemplo traps:
reload() {
    for pid in $pids; do
        kill -HUP $pid;
    done
}

stop() {
    for pid in $pids; do
        kill -TERM $pid;
    done
}

trap reload SIGHUP;
trap stop SIGTERM;
trap stop SIGINT;

# Trap para matar procesos hijos sin hacen un kill al script bash
#!/bin/bash

trap 'kill $(jobs -p)' EXIT

echo "hola"
python -c "
import time
while True:
  print 'vuelta'
  time.sleep(1)
"
echo "fin"

