# Waydroid
https://news.ycombinator.com/item?id=28616985
https://aur.archlinux.org/packages/waydroid/

Necesita un módulo que parece que no está disponible para el kernel que uso
Necesita también wayland


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


## Google Apps (gapps)
https://docs.genymotion.com/paas/latest/041_Installing_applications.html#from-playstore

https://opengapps.org/
Chequear (uname -m) si es x86 o x86_64

También hay un botón, pero me dice que el fichero está corrupto.
Haciendo drag&drop sobre la pantalla me funciona bien. Hay que esperar unas decenas de segundos a que diga que el flasheo ha ido bien y luego reiniciar.


## Instalar APK
Para transferir ficheros drag&drop sobre la pantalla o usar adb


Si al instalar una apk (drag&drop) nos dice que tiene codigo ARM, tendremos que instalar Genymotion-ARM-Translation
https://gist.github.com/wbroek/9321145
priv-adrianRepo/hack/Genymotion-ARM-Translation_v1.1.zip


## ADB
También podemos conectar por ssh

adb -s 192.168.60.106:5555 shell
  mirar en ps a donde conecta, habrá un par de adb arrancados

Instalar .zip
adb shell "/system/bin/flash-archive.sh /sdcard/Download/opengapps.zip"


## SSH
https://docs.genymotion.com/paas/latest/03_Accessing_an_instance/033_Accessing_a_virtual_device_from_SSH.html


## Errores
Mirar logcat

En un caso se estaba quedando sin memoria al abrir una app.



# Run apps
http://www.shashlik.io/

yay -S shashlik-bin

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





## Android emulator
http://developer.android.com/sdk/installing/index.html?pkg=tools

Lo más sencillo para usar las UI que viene con android-studio (tools -> AVD manager)

Mostrar devices que podemos crear:
avdmanager list

Mostrar devices creados:
avdmanager list avd

Los siguientes comando puede que sean antiguos:
Bajar un target:
sudo tools/android sdk

https://developer.android.com/studio/run/emulator-commandline
Arrancar emulador
android-sdk-linux/tools/emulator
