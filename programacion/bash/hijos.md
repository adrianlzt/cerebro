Si un script en bash ejecuta otros comandos, si matamos el script, este no matará a sus procesos hijos.
Una manera de hacerlo es un trap como vemos a continuación:


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
