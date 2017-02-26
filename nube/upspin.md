https://upspin.io
https://news.ycombinator.com/item?id=13700492

Upspin provides a global name space to name all your files. Given an Upspin name, a file can be shared securely, copied efficiently without “download” and “upload”, and accessed from anywhere that has a network connection.

Upspin aims to be a unified protocol for all applications to access (and possibly modify) data, wherever it is: maybe it is your website on your server, maybe it's a NASA dataset on some S3 tenant, maybe it's an imgur gallery, maybe it's an OpenStreetMap dump of their DB; the goal AFAICS is to give any application access to data regardless of where and how it is stored, so that applications can do what they're best at.

Relacion con:
Camlistore aims to be your repo of all your stuff that you may want to share with other people at a later time. It wants to be the repository of all your life and everything that happens.

Parece que alguno de sus desarrolladores son leyendas de UNIX/Plan9: Rob Pike, David Presotto, Eric Groosse


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


En el log del server de claves de upspin vemos:
2017-02-23 10:38:32.456037018 +0000 UTC: put attempt by "user@gmail.com": {"Name":"user@gmail.com","Dirs":["remote,dir.upspin.io:443"],"Stores":["remote,store.upspin.io:443"],"PublicKey":"p256\n54412559877835795967908359557052759554876170303422813539464768746508958612212\n57976894149077595223332210302199011153507595840080648007996147972742660618567\n"}
SHA256:6d4294e999e1ace2997f7fc4be6b30d283be8f40cb51e5f762197090ffe0ed9c
2017-02-23 10:38:32.874738496 +0000 UTC: put success by "user@gmail.com": {"Name":"user@gmail.com","Dirs":["remote,dir.upspin.io:443"],"Stores":["remote,store.upspin.io:443"],"PublicKey":"p256\n54412559877835795967908359557052759554876170303422813539464768746508958612212\n57976894149077595223332210302199011153507595840080648007996147972742660618567\n"}
SHA256:ee8667c6a3c2a928027fcb4ef05d24806020818f6e434d76690949b1ae53f2fd
2017-02-23 10:38:33.171364949 +0000 UTC: put attempt by "user+snapshot@gmail.com": {"Name":"user+snapshot@gmail.com","Dirs":null,"Stores":null,"PublicKey":"p256\n54412559877835795967908359557052759554876170303422813539464768746508958612212\n57976894149077595223332210302199011153507595840080648007996147972742660618567\n"}
SHA256:ad46d39f6fab36713aab50101bcf262533d80b3da2b540fd22cd6f328623de73
2017-02-23 10:38:33.696948147 +0000 UTC: put success by "user+snapshot@gmail.com": {"Name":"user+snapshot@gmail.com","Dirs":null,"Stores":null,"PublicKey":"p256\n54412559877835795967908359557052759554876170303422813539464768746508958612212\n57976894149077595223332210302199011153507595840080648007996147972742660618567\n"}
SHA256:eae82534c01a4ce5011bbfc18aeca35a0b21afa30858fe38d3fa6d3d6fbb9176


## upspinfs
Montar "fichero" de upspin como un sistema de ficheros local.


# Montar un server upsin directory / storage
https://upspin.io/doc/server_setup.md

upspin setupdomain -domain=upspin.undo.it

Esto crea un usuario upspin@upspin.undo.it
La pareja de claves las mete en /home/adrian/upspin/deploy/upspin.undo.it junto con un json de configuración (Addr, User, Bucket)
Y nos pasa un comando para recuperar en caso de perderlas.

El usuario que tengamos configurado en el fichero de conf de upspin (nuestro user "normal") será el que quede registrado como dueño de este server.
Para que se pueda verificar que somos dueños del dominio nos pedirá que metamos una entrada TXT en el servidor DNS.
Como saber que upspin nos ha dado por bueno el dominio?
Para compbrobar que se ha aplicado el cambio:
dig -t TXT upspin.undo.it

Ahora parece que tenemos que levantar el server, para luego con el comando setupserver avisar al servidor de claves para que lo verifique.

## Arrancar el server

En el docker:
Posiblemente tendremos ya el binario construido, si es asi:
upspinserver -https=localhost:8443
  asi parece que intenta configurar unos certificados de LetsEncrypt

Si queremos usar self signed certs:
upspinserver -https=localhost:8443 -log debug -letscache ''
  los coje de $GOPATH/src/upspin.io/rpc/testdata/{key,cert}.pem

$ curl -k https://localhost:8443
Unconfigured Upspin Server



Mirando como obtener certs de LetsEncrypt
https://github.com/google/acme/releases

Me peto en el container de docker al escribir la conf:
[root@b7e6b2c919f1 opt]# ./acme reg -gen mailto:adrianlzt@gmail.com
CA requires acceptance of their Terms and Services agreement:
https://letsencrypt.org/documents/LE-SA-v1.1.1-August-1-2016.pdf
Do you accept? (Y/n) 
write config: mkdir : no such file or directory

https://github.com/google/acme/blob/48ecb3cc25766a1a64257f2acd1778904753c434/config.go#L56
https://github.com/google/acme/blob/48ecb3cc25766a1a64257f2acd1778904753c434/config.go#L98
Puede que pete u.HomeDir ?


# mkdir /opt/certs
# ACME_CONFIG=/opt/certs ./acme reg -gen mailto:adrianlzt@gmail.com
# ACME_CONFIG=/opt/certs ./acme update -accept
# ACME_CONFIG=/opt/certs ./acme cert upspin.undo.it
upspin.undo.it: acme: identifier authorization failed

Al final con el container de letsencrypt.
Copiadas la key y el cert a /opt/upspin_lets/src/upspin.io/rpc/testdata/{key,cert}.pem
GOPATH=/opt/upspin_lets ./upspinserver -https=0.0.0.0:443 -log debug -letscache ''


En mi portatil:
~/upspin $ upspin setupserver -domain=upspin.undo.it -host=upspin.undo.it
Successfully put "upspin@upspin.undo.it" to the key server.
upspin: setupserver: Post https://upspin.undo.it:443/setupserver: x509: certificate signed by unknown authority

Falla porque mi portatil no reconoce la auth LetsEncrypt (curl https://upspin.undo.it falla)
Meto los certs
https://letsencrypt.org/certificates/
~/upspin $ sudo cp /var/tmp/letsencryptauthorityx3.pem /etc/ca-certificates/trust-source/anchors/letsencryptauthorityx3.crt
~/upspin $ sudo cp /var/tmp/lets-encrypt-x3-cross-signed.pem /etc/ca-certificates/trust-source/anchors/lets-encrypt-x3-cross-signed.crt
~/upspin $ sudo trust extract-compat

Rehago:
~/upspin $ upspin setupserver -domain=upspin.undo.it -host=upspin.undo.it
Ahora si funciona.

Cambio la conf de /home/adrian/upspin/config para usar el nuevo server


Errores en el server:
2017/02/23 23:55:47.932406 dir/server/tree.sendCurrentAndWatch: error adding watcher: user upspin@upspin.undo.it: dir/server/tree.LogIndex.Root: item
 does not exist: no root for user

2017/02/23 23:55:48.124979 dir/remote.Put("remote,upspin.undo.it:443")("upspin@upspin.undo.it/") error: I/O error:
        rpc.Invoke: Post https://upspin.undo.it:443/api/Dir/Put: x509: certificate signed by unknown authority







En los logs del key server aparece:
2017-02-23 23:48:10.94865133 +0000 UTC: put attempt by "adrianlzt@gmail.com": {"Name":"upspin@upspin.undo.it","Dirs":["remote,upspin.undo.it:443"],"Stores":["remote,upspin.undo.it:443"],"PublicKey":"p256\n41873911461133456434581425276487873957514912475078276041559532039115448408110\n75184241457733780434292648239137770537326210917631932241289891072850945979992\n"}
SHA256:06910008cb38cf7782723baba4c19a2c9771760a0d449654ce19c0ae47703b6a
2017-02-23 23:48:11.638451515 +0000 UTC: put success by "adrianlzt@gmail.com": {"Name":"upspin@upspin.undo.it","Dirs":["remote,upspin.undo.it:443"],"Stores":["remote,upspin.undo.it:443"],"PublicKey":"p256\n41873911461133456434581425276487873957514912475078276041559532039115448408110\n75184241457733780434292648239137770537326210917631932241289891072850945979992\n"}
SHA256:84dbd02563ba19fadb753080bc4b98d11c59a1b9c219410263101d3674d1cc4c





# Dudas
Un user tiene un unico dir y storage servers? O puede tener varios

Como se puede cambiar el dir/storage servers que he registrado?

Si se cae el server de claves?




# Develop
config.dev
username: adrianlzt@gmail.com
secrets: /home/adrian/.ssh
storeserver: remote,store.localhost:8445
dirserver: remote,dir.localhost:8444
packing: ee
keyserver: remote,localhost:8443

Crear un cert autofirmado para *.localhost para usarlo con los servers
Tendremos que meterlo en el SO para que lo traguen.

## keyserver
Tendremos que meter el cert de localhost en los certificados que se crea nuestro SO
Si no definimos mail_config, no levanta el endpoint /signup, suficente con meter tres lineas con algun caracter.
En el codigo cambiaremos las lineas del m.mail.Send por un log.Printf para ver por el log el link generado.

/home/adrian/.gvm/pkgsets/go1.8/global/src/upspin.io/cmd/keyserver/keyserver -https 0.0.0.0:8443 -tls_cert localhost.crt -tls_key localhost.key -log debug -mail_config mailconfig

Con esto ya podremos registrar usuarios y preguntar por usuarios.


## Dirserver
dirserver -config /home/adrian/upspin/dev/config.dev -https 0.0.0.0:8444 -tls_cert localhost.crt -tls_key localhost.key -log debug

# StoreServer
Levantar primero el dirserver, ya que al arrancar le preguntara
storeserver -config /home/adrian/upspin/dev/config.dev -https 0.0.0.0:8445 -tls_cert localhost.crt -tls_key localhost.key -log debug



Registrar dirserver y storeserver contra keyserver

It generates keys and config files for Upspin server users, placing them in $where/$domain and generates a signature that proves that the calling Upspin user has control over domain.


/home/adrian/.gvm/pkgsets/go1.8/global/src/upspin.io/cmd/upspin/upspin -config ~/upspin/dev/config.dev setupdomain -where /home/adrian/upspin/dev/setupdomain -domain localhost -cluster

Esto unicamente crea las claves en /home/adrian/upspin/dev/setupdomain/DOMINIO/ y un fichero de configuracion (User: upspin@DOMINIO)
Un dir para dirserver y otro para storeserver
Si no especificamos "-cluster" sera solo una conf para todo el server (ya que correran juntos)



# Internals

## Keyserver
Registro:
POST /signup?dir=dir.example.com%3A443&key=p256%0A54412559877960618567%0A&name=user%40gmail.com&store=store.example.com%3A443

Cuando el cliente necesita obtener el DirServer de un cliente envia al keyserver:
POST /api/Key/Lookup
user@email.com

Se añaden unas cabeceras Upspin-Auth-Request con el usuario que hace le petición, fecha y unas firmas.
Parece que se gestiona en la funcion Lookup de https://github.com/upspin/upspin/blob/master/key/remote/remote.go




# Contribuir
https://github.com/upspin/upspin/blob/master/CONTRIBUTING.md#contributing-code
https://golang.org/doc/contribute.html#Code_review

Se hace usando Gerrit: https://upspin-review.googlesource.com

Hacer signup para registrarnos

Generar password: https://upspin.googlesource.com/new-password

Firmar CLA https://developers.google.com/open-source/cla/individual

Bajar git-codereview
go get -u golang.org/x/review/git-codereview


git co master
git sync
Hacer cambios
git add ficheros
git change nombre_rama
  Esto nos abre la ventana de commit. La primera linea debe ser
  pkg afectado: que sucede (aqui debe ir lo que siguiria a "Este cambio modifica upspin para....")
  subject debe ser <= que 64 chars
  las lineas <= 70 chars
Si queremos, podemos meter mas ficheros en el git y volver a hacer el git change.

Cuando querramos enviar:
git mail

