Me parece que con pyboard.py me falla mas que con mpfshell.

# mpremote
https://docs.micropython.org/en/latest/reference/mpremote.html
Otra herramienta más para hacer lo mismo.
Nueva de la versión 1.16 https://github.com/micropython/micropython/releases/tag/v1.16

pip install mpremote

Podemos montar el directorio local, nos mete en el repl y ejecutar lo que queramos.
Pero no parece que recargue el fichero al modificarlo :/

Para ejecutar un programa y ver su stdout
mpremote run foo.py

repl python
mpremote repl

Subir ficheros:
mpremote cp foo.py :


# pyboard.py
https://docs.micropython.org/en/latest/reference/pyboard.py.html
https://github.com/micropython/micropython/blob/master/tools/pyboard.py

Parece que colisona con otra util del mismo nombre (pyboard) que instala rshell.
Podemos dejar esta como pyboard.py

Puede conectar por telnet, pero parece que micropython no tiene aún server telnet para esp32 (si para WiPy https://docs.micropython.org/en/latest/wipy/quickref.html?highlight=telnet#telnet-and-ftp-server)

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


Acceso via websockets (mirar webrepl.md para configurarlo)
mpfshell -c "open ws:192.168.43.136,PASSWORD"

Si no lo usamos durante un rato nos desconectará.





# rshell
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
