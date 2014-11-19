#!/bin/bash
# ejecuta comando hasta que salga 1
# Ej:. ./reintentar_comando.sh 'echo pepe'

CMD=$1
SLEEP=2
false
while [[ ! $? -eq 0 ]]; do sleep $SLEEP; echo "otra vuelta"; $CMD; done
