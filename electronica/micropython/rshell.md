https://github.com/dhylands/rshell

rshell -p /dev/ttyUSB0 --buffer-size=128

El buffer size es necesario para nodemcu (https://github.com/dhylands/rshell/issues/15)

repl
saltar al repl de la placa
Control+X para salir

Ejecutar comandos de la shell (en nuestro ordenador)
!uname

Ficheros en la placa:
ls /pyboard/
cat /pyboard/fichero.py
edit /pyboard/fichero.py


Copiar a la placa:
cp fichero.py /pyboard/fichero.py
