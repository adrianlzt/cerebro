# Run apps
http://www.shashlik.io/

yaourt -S shashlik-bin

Mirar que el .apk esté para x86
/opt/android-sdk/build-tools/25.0.1/aapt dump badging File.apk | grep native-code

Instalar la apk:
shashlik-install File.apk

Ver apks instaladas:
ls -la /home/adrian/.local/share/shashlik/

Ejecutarla:
shashlik-run com.carrefour.android.app.eshop Drive

Podemos configurarle un proxy https modificando el /usr/bin/shashlik-run
En emulator_args agregamos:
-http-proxy https://localhost/





## Android emulator ##
http://developer.android.com/sdk/installing/index.html?pkg=tools

Bajar un target:
sudo tools/android sdk

Crear un dispositivo
tools/android avd

Arrancar emulador
android-sdk-linux/tools/emulator


## Genymotion ##
http://techapple.net/2014/07/tutorial-installsetup-genymotion-android-emulator-linux-ubuntulinuxmintfedoraarchlinux/

Hace falta registrarse en una web.
Bajamos un programa para gestionar las imágenes de android.
  Se baja un .bin (bash script)
  sudo mkdir /opt/genymotion
  sudo chown adrian /opt/genymotion
  ./genymotion-2.7.2-linux_x64.bin -d /opt/
Arrancar con /opt/genymotion/genymotion

Si da este problema:
"The Genymotion Virtual device could not obtain an IP address.For an unknown reason, VirtualBox DHCP has not assigned an IP address to virtual device. Run the VirtualBox software to check for issues"
Se arregla así:
http://stackoverflow.com/questions/18641423/not-able-to-start-genymotion-device


Instalar Google Apps: https://gist.github.com/wbroek/9321145
Peta bastante.
Google+ saca todo el rato mensajes de que se ha parado.

Para transferir ficheros drag&drop sobre la pantalla.


Si al instalar una apk (drag&drop) nos dice que tiene codigo ARM, tendremos que instalar Genymotion-ARM-Translation
https://gist.github.com/wbroek/9321145
priv-adrianRepo/hack/Genymotion-ARM-Translation_v1.1.zip
