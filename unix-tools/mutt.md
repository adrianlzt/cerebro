Cliente de email

https://wiki.archlinux.org/index.php/mutt
https://www.neomutt.org
  mutt parcheado


# Basicos
m - redactar email
r - reply
g - group reply, responder a todos
a - añadir remitente al abook
L       list-reply      reply to mailing list address
f       forward         forward message
b       bounce          bounce (remail) message


# undelete
http://marc.info/?l=mutt-users&m=124036441704280&w=4
Si hemos borrado un mensaje y queremos recueprarlo:
:exec first-entry (para ir al comienzo de la lista)
u (undelete)

Creo que tambien vale (undelete todos los de la vista)
U.*

Tambien podemos pulsar el numero del mensaje que queremos recuperar (para saltar hasta él) y luego U


# Guardar email como texto
v sobre la lista de emails
seleccionar lo que queramos, y 's'

Otra forma, una vez en el mensaje:
|
cat > fichero


# Carpetas
https://dev.mutt.org/trac/wiki/MuttGuide/Folders

Si una carpeta empieza por "=" o "+", eso se sustituye por el valor de $folder


# Trash / Papelera
https://www.neomutt.org/feature/trash

# Contactos
abook para gestionar contactos

# Comandos
:exec comando

# Bindings
bind index G imap-fetch-mail


# Sincronizar
$


# Buscar
/ cosa
  por defecto solo en los subjects

/ ~b cosa
  busca en los bodies

/ ~B cosa
  en todo el mensaje
