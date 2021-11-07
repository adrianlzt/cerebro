http://www.idevelopment.info/data/Unix/Linux/LINUX_UsingSerialConsoles.shtml

También con screen y también con psedo-terminals
screen /dev/pts/113

Usar el programa minicom
Arrancar como root, en una sesión sin screen (usa comandos control+a)

Control+a z   p  -> editar parámetros de la conexión (velocidad, bits paridad, etc)
C^a z x -> salir

Para conectar a un cable usb-serie:
minicom --device /dev/ttyUSB0 --baudrate 9600

pacman -S community/uucp

cu -l /dev/ttyUSB0 -s 9600

Otras opciones:
sudo picocom -b 9600 /dev/ttyUSB0
sudo minicom -b 9600 -D /dev/ttyUSB0

Para salir
control+a control+x

Si estamos en tmux
control+a control+a control+x


# Simular puerto serie
https://stackoverflow.com/a/19733677/1407722

socat -d -d pty,raw,echo=0 pty,raw,echo=0

Nos muestra dos puertos abiertos.

Lo que escribamos en uno se verá en el otro y viceversa.

Podemos ver contenido con picocom, aunque para escribir no funciona.
Si puedo escribir con:
echo ATXX > /dev/pts/306
