Me parece que con pyboard.py me falla mas que con mpfshell.

# mpremote
https://github.com/bulletmark/mpr
wrapper para mpremote, más linux friendly

mpr list
  mostrar dispositivos

mpr -d /dev/ttyUSB2 repl
  entrar en el repl

mpr -d /dev/ttyUSB2 ls
  listar contenido de ese dev

mpr -d /dev/ttyUSB2 put hx711_gpio.py .
  copiar ese fichero local al dispositivo


https://docs.micropython.org/en/latest/reference/mpremote.html
Otra herramienta más para hacer lo mismo.
Nueva de la versión 1.16 https://github.com/micropython/micropython/releases/tag/v1.16

pip install mpremote

Podemos montar el directorio local, nos mete en el repl y ejecutar lo que queramos.
Pero no parece que recargue el fichero al modificarlo :/

Dispositivos disponibles (CP2102 será el esp32):
mpremote connect list

Para ejecutar un programa y ver su stdout
mpremote run foo.py

repl python
mpremote repl

Subir ficheros:
mpremote cp foo.py :

Mostrar ficheros en el device ttyUSB1 (puede que el ttyUSB0 tengra otro dispositivo USB)
mpremote connect /dev/ttyUSB1 fs ls



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

Necesita:
pip install websocket-client==0.35.0

11/02/2022, no consigo conectar. Veo que llega el GET, pero parece que no hace más.
El webrepl de micropython si funciona.

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
