# normcap
capturar texto haciendo una captura de pantalla
AUR/normcap
No funciona bien con i3, hace capturas en negro.
No he mirado mucho que puede ser.

# frog
https://github.com/TenderOwl/Frog
https://github.com/yochananmarqos/pkgbuilds/blob/master/elementary-frog/

Se puede instalar con flatpak.
Tarda mucho en arrancar, tal vez porque no encuentra lo del error de abajo?

Hace falta algún servicio de captura de pantalla registrando en dbus
g-dbus-error-quark: GDBus.Error:org.freedesktop.DBus.Error.ServiceUnknown: The name org.gnome.Shell.Screenshot was not provided by any .service files (2)


# Tesseract
## Install
pacman -S tesseract tesseract-data-eng tesseract-data-spa

## Uso
Así saca por stdout el texto reconocido:
tesseract -l spa img-2021-10-12-131207.png -

Pasarle directamente una captura de pantalla:
import -window Calculadora png:- | tesseract -l spa - -
