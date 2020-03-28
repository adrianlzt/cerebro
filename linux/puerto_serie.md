http://www.idevelopment.info/data/Unix/Linux/LINUX_UsingSerialConsoles.shtml


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
