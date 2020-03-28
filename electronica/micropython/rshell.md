yay mpfshell
sudo mpfshell ttyUSB0
> ls
> put xxx

mpfshell -n -c "open ttyUSB0; put boot.py"

repl
  para saltar al repl de python
  para salir Control+]




https://github.com/dhylands/rshell

yay aur/rshell

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


En un comando:
rshell -p /dev/ttyUSB* --buffer-size=128 cp main.py /pyboard/
