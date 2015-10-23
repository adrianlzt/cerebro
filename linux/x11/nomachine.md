https://www.nomachine.com/

Es como el VNC pero más rápdio

Permite grabar el desktop.
Fácil compartir dispositivos (imprimir en una impresora local algo de un pc remoto)
Dice que funcion bien con videos, dvd, gráficos, etc


# Arch
yaourt -S nomachine

Si queremos parar el servidor local que ha arrancado la instalación:
sudo systemctl disable nxserver

Solo cliente:
/usr/NX/bin/nxplayer.bin


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

