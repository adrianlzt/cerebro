Cliente de email

# undelete
http://marc.info/?l=mutt-users&m=124036441704280&w=4
Si hemos borrado un mensaje y queremos recueprarlo:
:exec first-entry (para ir al comienzo de la lista)
u (undelete)

Creo que tambien vale (undelete todos los de la vista)
U.*


# Guardar email como texto
v sobre la lista de emails
seleccionar lo que queramos, y 's'

Otra forma, una vez en el mensaje:
|
cat > fichero


# Carpetas
https://dev.mutt.org/trac/wiki/MuttGuide/Folders

Si una carpeta empieza por "=" o "+", eso se sustituye por el valor de $folder
