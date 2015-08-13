https://wiki.archlinux.org/index.php/Xdg-open

xdg-open fichero
xdg-open URL

Abre con la aplicación predefinida en:

https://wiki.archlinux.org/index.php/Default_applications#Using_MIME_types_and_desktop_entries

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


