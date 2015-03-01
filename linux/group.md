Meter el usuario en un grupo secundario.
CUIDADO: borra la asosiación a los grupos que no pongamos en esta lista
usermod -G grupo1,grupo2 usuario


## Añadir a un grupo secundario ##

General:
gpasswd -a adrian vboxusers

Ubuntu:
adduser adrian vboxusers

CentOS:
usermod -a -G ftp tony

## Borrar de un grupo secundario ##

General:
gpasswd -d adrian vboxusers

Ubuntu:
deluser adrian vboxusers



Hace falta volver a loguearse para que se apliquen los cambios.
O ejecutar el comando:
newgrp NOMBREGRUPO


Podemos hacer también:
$ sudo su
# login adrian
$ id
Aparecerán los grupos nuevos, pero si lo queremos para una app X11 no nos dejará

O
% su adrian
$ id
