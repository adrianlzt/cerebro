Instalacion para arch:
Version compilada:
yaourt -Si tid/skypeforlinux-bin

https://aur.archlinux.org/packages/skypeforlinux-bin/

Esta versión es una aplicación Electron (https://electron.atom.io/)

Su código (o al menos parte de él) está en /usr/share/skypeforlinux/resources/app.asar
Dentro de ese fichero se encuentran empaquetados todos los ficheros de la propia app.
Hay un json al comienzo que especifica cada parte cuanto ocupa y en que offset comienza.
Si modificamos el fichero deberemos respetar el tamaño de la parte, o rectificar el size y los offsets.


# Debug
Podemos activar la pestaña de debug con
Control+Alt+Shift+d

Usa websocket, a parte de llamadas HTTP, para comunicarse con el servidor.
