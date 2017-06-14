http://www.freedesktop.org/software/systemd/man/systemd-run.html

Run programs in transient scope or service units

sudo systemd-run python /var/tmp/sleep.py
Nos devuelve el nombre de la unidad, algo tipo: run-xxxxx.service

Ahora podemos usar systemctl status/stop/restart


Un uso típico es para crear un timer.
Se puede hacer un systemd-run con un calendar y creará un .service y un .timer temporales.


Con el parametro -t sacamos el stdout/stderr por pantalla

Podemos usar --user para usar el systemd del usuario


Se puede limitar la cantidad de recursos:
systemd-run -p BlockIOWeight=10 updatedb


Para ver las variables de entorno disponibles:
systemd-run env
journalctl -u run-19945.service


Ejecutar un comando en 30"
systemd-run --on-active=30 --timer-property=AccuracySec=100ms /bin/touch /tmp/foo

Ejecutar a una hora concreta:
systemd-run --user --on-calendar=16:28 comando
