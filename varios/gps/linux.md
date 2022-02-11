https://gpsd.gitlab.io/gpsd/index.html

Tras instalar arranca una unit socket para escuchar en el puerto de gpsd (2947)

Para ver si está escuchando:
nc localhost 2947
Debe devolvernos un JSON con datos de la versión

A mano, para hacer pruebas:
gpsd /dev/ttyUSB1 --foreground -F /var/run/gpsd.sock


Si queremos añadir un device con una unit
systemctl start gpsdctl@ttyUSB1.service

Para configurar el device de un modem 4g al arranque hice esta unit:
[Unit]
Description=Enable GPS in the modem
Requires=dev-ttyUSB1.device
After=dev-ttyUSB1.device
Wants=gpsdctl@ttyUSB1.service
[Service]
Type=oneshot
ExecStart=/usr/bin/true
[Install]
WantedBy=multi-user.target



Ver con una cli si tenemos datos
cgpsd


# Ejecutar
A mano:
sudo gpsd --foreground --debug 2 /dev/ttyUSB1

Luego arrancar la interfaz gráfica:
xgps

No he conseguido que me funcione
