https://wiki.archlinux.org/index.php/Xdg-open
https://wiki.archlinux.org/index.php/Default_applications#Using_MIME_types_and_desktop_entries
https://wiki.archlinux.org/title/XDG_MIME_Applications
https://wiki.archlinux.org/title/Xdg-utils

xdg-open fichero
xdg-open URL

Abre con la aplicación predefinida en:
~/.config/mimeapps.list
~/.local/share/applications/mimeapps.list



Para obtener el tipo mime de un fichero:
xdg-mime query filetype FICHERO

Para obtener la app que abrirar un determinado tipo mime
xdg-mime query default image/jpeg
eog.desktop


Para cambiar la app or defecto
xdg-mime default application.desktop mime/type

Tipos mime:
/usr/share/mime/types


Una app con GUI para simplificar el proceso:
aur/selectdefaultapplication-git

Nos permite ver para cada app que tipos mime puede abrir y cuales tiene puesto que es la app por defecto.


# Ficheros .desktop
https://wiki.archlinux.org/title/Desktop_entries

La del usuario tiene precedencia.
/usr/share/applications/ or /usr/local/share/applications/
~/.local/share/applications/

Si modificamos un fichero .desktop, hay que actualizar la base de datos de aplicaciones:
update-desktop-database ~/.local/share/applications/


# handlr / sustituto para xdg-open
handlr
Instalar también: aur/xdg-utils-handlr (sustituye a xdg-utils), nos da un nuevo xdg-open que usa handlr en vez de xdg-open.

Listar asociaciones de mime a apps:
handlr list

Modificar asociaciones de mime a apps (podemos hacerlo con el mime o la extensión):
handlr set .png feh.desktop
handlr set image/png feh.desktop

Obtener la app por defecto para un tipo mime:
handlr get image/png

Más info en formato json (el comando):
handlr get x-scheme-handler/https --json
