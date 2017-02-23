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

## Snapshots
ann+snapshot@example.com/2016/12/03/

## Otros ejemplos
One could imagine simple but convenient connectors to do things like provide a Twitter feed through a file system interface, or a greppable issue tracker for GitHub bug reports, or an aggregator for music or video that provides a unified view of all of one’s entertainment subscriptions.

As a more dynamic example, earlier we mentioned the idea of a connected device such as a video camera. The owner of the camera could register a special user to host the camera or, as with the snapshot, serve it through a suffixed name like ann+camera@example.com. The full path might be ann+camera@example.com/video.jpg, with the idea that every read of the file retrieves the most recent frame.


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
Los metadatos (nombres de los ficheros y fichero Access) del directory server no estan encriptados, aunque si viajan cifrados.

Por cada fichero, el usuario genera una clave simétrica (AES-256) y encripta el fichero usando esa clave simétrica.
Luego encripta esa clave simétrica con las claves públicas de los usuarios que tienen que tener acceso.
Por último el usuario firma estas encriptaciones con su clave privada (P-256).

El fichero encriptado se envía al storage server.
Las claves encriptadas se envian al directory server.o

## Gestion de claves
Están en proceso de migrar a Key Transparency https://security.googleblog.com/2017/01/security-through-transparency.html
Log del server actual: https://key.upspin.io/log

Al generar una nueva pareja de claves, estas se almacenan en ~/.ssh
  public.upspinkey
  private.upspinkey
Se genera un proquint con el seed utilizado (que deberemos almacenar para poder resutarar?)
Un SHA-256 hash de la clave pública se usa para identificar al usuario.

En secret2.upspinkey se almacenarán parejas de claves antiguas.




# Cliente
go >= 1.8
go get -u upspin.io/...

Store de upspin: store.upspin.io
Dir de upspin: dir.upspin.io

Config: https://upspin.io/doc/config.md
$HOME/upspin/config

Darnos de alta en el server de claves de upspin
upspin signup -dir=dir.upspin.io -store=store.upspin.io user@gmail.com

Genera las claves publica y privada ~/.ssh/{public,secret}.upspinkey
Nos genera un comando para recuperar la pareja de claves generadas
Envia un email de confirmación. En ese email se envia como argumentos el dir y store servers, nuestro email, la clave publica y la fecha.


## upspinfs
Montar "fichero" de upspin como un sistema de ficheros local.


# Dudas
Un user tiene un unico dir y storage servers? O puede tener varios
