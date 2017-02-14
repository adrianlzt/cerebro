https://cmus.github.io/

cmus is a small, fast and powerful console music player for Unix-like operating systems.


# Comandos
1 vista por grupos
2 vista de canciones para el grupo seleccionado
5 abrir file browser
   a añadir file/dir
   :save para terminar

c play/pause
b next track
z previous track
cursores, avance por la canción 10"
<,> avance 1'

:q salir


# Remoto
Una vez arrancado cmus lo podemos controlar con:
cmus-remote

-p play
-u pause
...


# unit para systemd
https://gist.github.com/3e284c83d64f6f648aa56c9fdc79b3b7

[Unit]
Description=cmus

[Service]
Type=forking
User=chip
ExecStart=/usr/bin/screen -d -m -S cmus /usr/bin/cmus --listen /run/user/1000/cmus-socket
Environment="HOME=/home/chip" "USERNAME=chip"

[Install]
WantedBy=multi-user.target
