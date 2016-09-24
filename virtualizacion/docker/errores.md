Error response from daemon: client is newer than server (client API version: 1.20, server API version: 1.19)
Actualizamos docker pero no reiniciamos el servicio.


Problemas con los permisos? Los ficheros aparecen sin permisos:
?---------   ? ?  ?     ?            ? README.md
Mirar que no tengamos el selinux activado
http://stackoverflow.com/questions/24288616/permission-denied-on-accessing-host-directory-in-docker
