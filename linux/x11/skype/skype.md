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

# Extraer app
cd /usr/share/skypeforlinux
cp -r resources /var/tmp/sky
cd /var/tmp/sky
mkdir OUT
asar e app.asar OUT

La aplicación mayoritariamente reside en js/app.js

prettier app.js > app.js.pretty
CUIDADO! tiene 309167 lineas!!


He intentado meter el Burp para sniffar el trafico WSS, pero no traga el cert y no parece sencillo hacerlo. https://github.com/electron/electron/issues/6222
