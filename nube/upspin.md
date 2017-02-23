https://upspin.io

Upspin provides a global name space to name all your files. Given an Upspin name, a file can be shared securely, copied efficiently without “download” and “upload”, and accessed from anywhere that has a network connection.


# Usuarios
Identificados por su email.

Pueden tener varios services jugando con el +:
user+servicio1@email.com
user+servicio2@email.com


# Naming / Ficheros
user@email.com/dir/file

Generalmente el contenido serán ficheros, pero no está limitado, podría ser la salida dinámica de un programa.

Se pueden crear enlaces (ln -s)


# Access control
https://upspin.io/doc/access_control.md

Por defecto todo es privado.

En cada directorio podremos crear un fichero "Access" estilo:
read: joe@here.com, moe@there.com

Dara permisos a esos dos usuarios a este directorio y todos los subdirectorios recursivamente.
En un subdirectorio podremos tener otro fichero Access que modifique estos permisos.



# Cliente
go >= 1.8
go get -u upspin.io/...
