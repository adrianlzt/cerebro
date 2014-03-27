Meter el usuario en un grupo secundario.
CUIDADO: borra la asosiación a los grupos que no pongamos en esta lista
usermod -G grupo1,grupo2 usuario


Añadir a un grupo:
adduser adrian vboxusers


Hace falta volver a loguearse para que se apliquen los cambios.
Podemos hacer también:
$ sudo su
# login adrian
$ id
Aparecerán los grupos nuevos, pero si lo queremos para una app X11 no nos dejará
