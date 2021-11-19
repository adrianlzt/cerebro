# pyboard
https://docs.micropython.org/en/latest/reference/pyboard.py.html
https://github.com/micropython/micropython/blob/master/tools/pyboard.py

Parece que colisona con otra util del mismo nombre (pyboard) que instala rshell.
Podemos dejar esta como pyboard.py

No tiene repl, podemos usar mpfshell para eso.

pyboard.py -d /dev/ttyUSB0 -c "print(123)"

Mostrar ficheros
pyboard.py -d /dev/ttyUSB0 -f ls

Copiar fichero a la placa:
pyboard.py -d /dev/ttyUSB0 -f cp main.py :device


# mpfshell
yay mpfshell
sudo mpfshell ttyUSB0
> ls
> put xxx

Si no podemos conectar, darle un reset a la placa.

mpfshell -n -c "open ttyUSB0; put boot.py"
Saltar al repl directamente
mpfshell -n -c "open ttyUSB0 ; repl"


repl
  para saltar al repl de python
  para salir Control+]




# rshell / pyboard
https://github.com/dhylands/rshell

yay aur/rshell

rshell -p /dev/ttyUSB0 --buffer-size=128

Permite conectar también vía IP.

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
