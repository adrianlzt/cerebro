https://wiki.archlinux.org/index.php/GnuPG
https://wiki.archlinux.org/index.php/GnuPG_(Espa%C3%B1ol)
https://www.gnupg.org/gph/en/manual/x457.html


La idea es tener un juego de llaves.
En la clave pública se mete el nombre, email.
Esta clave pública se puede subir a servidores de llaves públicos.

Generalmente las claves privadas las generamos sin caducidad, aunque estrictamente deberíamos hacerla que caduque. Pero si caduca la privada antes de que hayamos generado otra nueva privada, nos quedaremos sin el juego de llaves.


Se suele tener distintas claves privadas (subclaves) para los diferentes usos: firmar, certificar, cifrar (descrifrar cosas que hayan cifrado con tu clave pública)

Puedes tener distintas subclaves para distintos usos. Cada subclave puede tener una contraseña distinta.



Lo suyo es tener protegida por pass el juego de llaves. El SO nos pedirá esta clave cuando queramos hacer algo con gpg, para poder arrancar el gpg-client.
Cada cierto tiempo puede que se cierre el agente y nos solicite la clave de nuevo

# GPG
Mostrar mis claves
gpg -k
gpg --list-public-keys

Lista todas las claves aceptadas
gpg -K
gpg --list-secret-keys

Borrar key publica
gpg --delete-keys nombre

Cambiar la passphrase con la que se proteje la clave privada:
gpg --edit-key KEYID
gpg> passwd
gpg> save

También podemos añadir más direcciones de email:
gpg> adduid
  nos pedira nombre, comentario y email
gpg> save

gpg --send-keys key-id (o email)
para enviar a los servers


## Encriptar/desencriptar
echo "otra" | gpg -a -r destinatario@mail.com -e - | gpg -d -
  Si usamos "| gpg -d" no nos podrá pedir la clave, si le hace falta, porque tenemos ocupado el stdin
  Usar gpg -d fichero

-a es por si el contenido cifrado lo tenemos que pegar en ASCII
-r es la clave publica de a quien queremos enviar el mensaje. Debemos tener su clave publica disponible
-e es el fichero a encriptar, o en este caso stdout
-se firmara y cifrará el fichero
Podemos poner -o file, para enviar la encriptación a un fichero

-d es descriptar, en este caso stdout (podría ser un fichero)

gpg -r adrianlzt@gmail.com -o fichero.tar.gpg -e fichero.tar
gpg -o fichero.tar -d fichero.tar.gpg

## Importar una clave
gpg --import fichero.key
gpg --import private.key
  nos pedirá la password. Si ponemos --batch la importará sin pedirnos clave. Nos la pedirá al desencriptar

## Exportar mi clave publica
gpg --output public.key --armor --export nombre@email.com

gpg -a --export nombre@email.com > public.key

Exportar privada (pone el ID si queremos exportar una especifica):
gpg --export-secret-keys --armor > private.key
gpg --export-secret-keys --armor 1234ABCD > private.key

La podemos subir por ejemplo al servidor de claves del MIT: https://pgp.mit.edu/
Todos los servers de claves GPG están sincronizados
http://keys.gnupg.net/
https://pgp.mit.edu/
Si queremos usar otro server: gpg --keyserver keys.openpgp.org ...

La key-id es el nombre que aparece cuando hacemos gpg -k o gpg -K al lado de la longitud de la clave. Ejemplo: "pub   2048R/403E82AF 2019-03-05" -> 403E82AF

Enviar nuestra clave a los servers públicos:
gpg --send-keys key-id

Buscar en los servers públicos:
gpg --search-keys email@buscado.com

Bajarnos una key de los servers publicos:
gpg --recv-keys key-id

Creo que por defecto se usa el server: http://hkps.pool.sks-keyservers.net


Revocar una key:
gpg --edit-key USERID
> revkey



También se puede publicar en el DNS si es nuestro:
https://grepular.com/Publishing_PGP_Keys_in_the_DNS

## Firmar un fichero
Se firma con la clave privada y la gente comprueba la firma con la clave pública

gpg -s fichero
  genera un fichero.gpg

gpg --clearsign fichero
  genera un fichero.asc con el contenido del fichero y la firma en texto plano

## Verificar firma
gpg --verify fichero.gpg
gpg --verify fichero.asc


# Agente
https://wiki.archlinux.org/index.php/GnuPG#gpg-agent

Corriendo debajo de systemd user
 gpg-agent.service
 gpg-agent.socket

Socket: gpgconf --list-dirs | grep agent-socket

Conf: https://wiki.archlinux.org/index.php/GnuPG#gpg-agent
man gpg-agent

Recargar el agente tras cambiar la conf:
gpg-connect-agent reloadagent /bye

## Definir el tiempo que el agente tardara en pedir de nuevo la clave
default-cache-ttl 60

## Cambiar como nos pide la clave en X11
https://wiki.archlinux.org/index.php/GnuPG_(Espa%C3%B1ol)#pinentry

## Poder seleccionar el pinentry dependiendo de una variable de entorno
http://unix.stackexchange.com/questions/236746/change-pinentry-program-temporarily-with-gpg-agent

Copiamos el fichero gnupg_pinentry-env.sh a /usr/bin/pinentry-env
Lo elegimos como pinentry program en el .gnupg/gpg-agent.conf

Para elegir pinentry:
PINENTRY_USER_DATA=gnome3 APP ...

Ejemplo:
PINENTRY_USER_DATA=gnome3 pass internet/servicio



# Apps
Aplicación para ver las claves GPG (a parte del resto) en linux-gnome: seahorse

Aplicación para gestionar claves estilo keepass: pass (mirar unix-utils/pass.md)


# Errores
pinentry muy lento
https://ubuntuforums.org/showthread.php?t=2361781
gnome-keyring-daemon --replace --daemonize --components=secrets,ssh,pcks11
