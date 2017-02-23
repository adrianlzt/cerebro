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


# Estructura
key.upspin.io almacena las claves publicas de los usuarios

Storage server: donde se almacenan los datos. La idea es que cada uno tenga el suyo
Los ficheros se almacenan segun una referencia (hash de la información almacenada)

Directory server: hace el mapeo entre los nombres de los ficheros y los hashes

Para pedir ann@example.com/path/file:
  1.- se pregunta a key.upspin.io por la ip del storage server de ann@example.com
  2.- se pregunta al directory server de ann@example.com por /path/file, nos devuelve la ip de un storage server
  3.- se pide al storage server que nos de el contenido


# Seguridad
https://upspin.io/doc/security.md

El contenido de los ficheros esta cifrado por defecto.
Los metadatos (nombres de los ficheros y fichero Access) del directory server no.



# Cliente
go >= 1.8
go get -u upspin.io/...
