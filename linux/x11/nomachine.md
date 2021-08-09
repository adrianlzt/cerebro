# x2go
Opción más sencilla: x2go
nomachine no me levantaba el puerto 4000 y la doc no es clara.

pacman -Ss x2goserver
sudo x2godbadmin --createdb
systemctl start x2goserver

Logs:
journalctl -f | grep x2go

En el cliente
pacman -Ss x2goclient
x2goclient


# nomachine
https://www.nomachine.com/

Es como el VNC pero más rápdio

Mueve el raton de la sessión gráfica que esté arrancada.

Permite grabar el desktop.
Fácil compartir dispositivos (imprimir en una impresora local algo de un pc remoto)
Dice que funcion bien con videos, dvd, gráficos, etc


# Arch
yaourt -S nomachine

Si queremos parar el servidor local que ha arrancado la instalación:
sudo systemctl disable nxserver

Solo cliente:
/usr/NX/bin/nxplayer



# Ubuntu
https://www.nomachine.com/download/linux&id=1
dpkg -i nomachine...deb


# Usar ssh keys
https://www.nomachine.com/AR02L00785

## En el server
vi ~/.nx/config/authorized.crt
  añadir la pub key

## En el cliente
"Edit connection"
Advanced
Private Key


# Windows
Enviar control+alt+supr
https://www.nomachine.com/AR02L00784

Pulsar Control+Alt+0
Buscar un icono abajo a la derecha, al pulsar nos saldrá un desplegable, pichamos y eso envia el ctrl+alt+supr
