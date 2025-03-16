# Waydroid

<https://docs.waydro.id/>
<https://wiki.archlinux.org/title/Waydroid>
<https://news.ycombinator.com/item?id=28616985>
<https://aur.archlinux.org/packages/waydroid/>

Me ha funcionado correctamente.

Necesita un módulo que parece que no está disponible para el kernel que uso, si está en linux-zen (parece que ya está en casi todos los precomilados).
Necesita también wayland (pero se puede usar con x11+cage).

Se puede usar weston para correr wayland encima de x11
<https://www.reddit.com/r/linuxquestions/comments/qs9c9s/how_to_run_waydroid_under_xorg/>

La primera vez que usamos waydroid (el `-s` para tener imágenes base con google apps, `-f` si queremo forzar el init):

```bash
sudo waydroid init -s GAPPS
```

Con la imagen de GAPPS me dice que el dispositivo no está cerficado para usar google apps o google services.

Arrancar el servicio:

```bash
systemctl start waydroid-container.service
```

Comenzar una sesión:

```bash
waydroid session start
```

Si no tenemos wayland, arrancar una ventana con wayland usando

cage:

```bash
cage waydroid show-full-ui
```

weston:

```bash
weston
```

Dentro de ella, mostrar la UI de waydroid:

```bash
waydroid show-full-ui
```

Problemas con la red? Probar a reiniciar el servicio:

```bash
systemctl restart waydroid-container.service
```

Si me da problemas con algo de arrancando un dnsmasq, parar el que tenemos corriendo.

Para instalar una apk:

```bash
waydroid app install /path/to/apk
```

Listado de APKs disponibles:

```bash
waydroid app list
```

## arm

Mirar aur/waydroid-script-git

Si queremos instalar un .apk de arm en waydroid (que seguramente será x86_64), necesitamos instalar el paquete de traducción:
<https://github.com/casualsnek/waydroid_script>
usar "uv venv --system-site-packages" para que no de errorores con paquetes que faltan

Parece que libndk y libhoudini hacen lo mismo.

```bash
python main.py install libndk
```

Después de instalar libndk, instalar la apk arm:

```bash
waydroid app install /path/to/apk
```

Problemas? Reiniciar el servicio y recomenzar:

```bash
systemctl restart waydroid-container.service
```

## shell

Acceder a la shell de waydroid/emulador:

```bash
waydroid shell
```

También me funciona con:

```bash
adb shell
```

A veces, no se por qué, el adb shell no funciona, no detecta ningún dispositivo.
Cerrando waston y reiniciando el servicio de systemd parace que lo arregla.

## red

Para tener red tenemos que habilitar ciertas cosas en el firewall:
<https://wiki.archlinux.org/title/Waydroid#:~:text=app%20launch%20%24package_name-,Network,-The%20network%20should>

## Proxy

<https://github.com/waydroid/waydroid/issues/870#issuecomment-1696466694>
<https://julien.duponchelle.info/android/use-proxy-with-waydroid#:~:text=Install%20the%20certificate%20in%20Waydroid>

Para configurar un proxy http (podemos poner la ip del host):

```
adb shell settings put global http_proxy "172.17.0.1:8080"
adb shell settings put global https_proxy "172.17.0.1:8080"
```

Quitar proxy:

```bash
adb shell settings put global http_proxy :0
adb shell settings put global https_proxy :0
```

Las apps pueden ignorar estos proxies.

Tras meter el cert en el overlay, terminar la sesión de waydroid y arrancar de nuevo.

## Modificar ficheros RO

Crear los ficheros en el overlayfs (/var/lib/waydroid/overlay/) y luego reiniciar la sesión.

## Root / magisk

Este no me ha funcionado, y pide root: <https://github.com/waydroid/waydroid/issues/1415>

<https://github.com/nitanmarcel/waydroid-magisk>

Probando aur/waydroid-magisk

Necesito usar weston, con cage no me encuentra la sessión de waydroid.

Con esto puedo hacer "su", pero no es root por defecto.

```bash
waydroid prop set persist.waydroid.root_access true
```

Esto me rompe "adb shell", aunque "waydroid shell" sigue funcionando.

# Genymotion

<http://techapple.net/2014/07/tutorial-installsetup-genymotion-android-emulator-linux-ubuntulinuxmintfedoraarchlinux/>

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
<http://stackoverflow.com/questions/18641423/not-able-to-start-genymotion-device>

## Google Apps (gapps)

<https://docs.genymotion.com/paas/latest/041_Installing_applications.html#from-playstore>

<https://opengapps.org/>
Chequear (uname -m) si es x86 o x86_64

También hay un botón, pero me dice que el fichero está corrupto.
Haciendo drag&drop sobre la pantalla me funciona bien. Hay que esperar unas decenas de segundos a que diga que el flasheo ha ido bien y luego reiniciar.

## Instalar APK

Para transferir ficheros drag&drop sobre la pantalla o usar adb

Si al instalar una apk (drag&drop) nos dice que tiene codigo ARM, tendremos que instalar Genymotion-ARM-Translation
<https://gist.github.com/wbroek/9321145>
priv-adrianRepo/hack/Genymotion-ARM-Translation_v1.1.zip

## ADB

También podemos conectar por ssh

adb -s 192.168.60.106:5555 shell
mirar en ps a donde conecta, habrá un par de adb arrancados

Instalar .zip
adb shell "/system/bin/flash-archive.sh /sdcard/Download/opengapps.zip"

## SSH

<https://docs.genymotion.com/paas/latest/03_Accessing_an_instance/033_Accessing_a_virtual_device_from_SSH.html>

## Errores

Mirar logcat

En un caso se estaba quedando sin memoria al abrir una app.

# Run apps

<http://www.shashlik.io/>

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
-http-proxy <https://localhost/>

## Android emulator

<http://developer.android.com/sdk/installing/index.html?pkg=tools>

Lo más sencillo para usar las UI que viene con android-studio (tools -> AVD manager)

Mostrar devices que podemos crear:
avdmanager list

Mostrar devices creados:
avdmanager list avd

Los siguientes comando puede que sean antiguos:
Bajar un target:
sudo tools/android sdk

<https://developer.android.com/studio/run/emulator-commandline>
Arrancar emulador
android-sdk-linux/tools/emulator

Para tener root: <https://proandroiddev.com/root-an-android-emulator-avd-9f912328ca08>
Con Android 15 no me ha funcionado.
con Android 12 si
