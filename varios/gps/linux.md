https://gpsd.gitlab.io/gpsd/index.html

Tras instalar arranca una unit socket para escuchar en el puerto de gpsd (2947)

Para ver si está escuchando:
nc localhost 2947
Debe devolvernos un JSON con datos de la versión

A mano, para hacer pruebas:
gpsd /dev/ttyUSB1 --foreground -F /var/run/gpsd.sock



# Ejecutar
A mano:
sudo gpsd --foreground --debug 2 /dev/ttyUSB1

Luego arrancar la interfaz gráfica:
xgps

No he conseguido que me funcione
