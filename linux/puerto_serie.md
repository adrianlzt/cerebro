http://www.idevelopment.info/data/Unix/Linux/LINUX_UsingSerialConsoles.shtml


Usar el programa minicom
Arrancar como root, en una sesión sin screen (usa comandos control+a)

Control+a z   p  -> editar parámetros de la conexión (velocidad, bits paridad, etc)
C^a z x -> salir

Para conectar a un cable usb-serie:
minicom --device /dev/ttyUSB0 --baudrate 9600


cu -l /dev/ttyUSB0 -s 9600
