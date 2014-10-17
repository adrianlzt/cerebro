http://www.freedesktop.org/software/systemd/man/systemd.snapshot.html

Creamos una "foto" del estado actual de los servicios para luego poder volver a dicho estado.
El estado que cambia es de procesos running or stopped

# PROBLEMA #
En CentOS 7 no hace nada


systemctl snapshot NOMBRE
  crea una snapshot

systemctl list-units --all --type=snapshot
systemctl list-units -a -t snapshot
  listar snapshots

systemctl isolate NOMBRE.snapshot
  volver al estado del snapshot

systemctl delete NOMBRE.snapshot
