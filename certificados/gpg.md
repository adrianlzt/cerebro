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
gpg -K

Lista todas las claves aceptadas
gpg -k

## Encriptar/desencriptar
echo "otra" | gpg -a -r destinatario@mail.com -e - | gpg -d -

-a es por si el contenido cifrado lo tenemos que pegar en ASCII
-r es la clave publica de a quien queremos enviar el mensaje. Debemos tener su clave publica disponible
-e es el fichero a encriptar, o en este caso stdout

-d es descriptar, en este caso stdout (podría ser un fichero)

## Importar una clave
gpg --import fichero.key

## Exportar mi clave publica
gpg --output public.key --armor --export nombre@email.com

gpg -a --export nombre@email.com > public.key

La podemos subir por ejemplo al servidor de claves del MIT: https://pgp.mit.edu/
Todos los servers de claves GPG están sincronizados

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
