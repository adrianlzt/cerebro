Control del terminal android desde un pc:

Para permitirlo tenemos que ir a las opciones de desarrollo y habilitar "Depuracion USB"

# Arch

```bash
yaourt -S android-sdk-platform-tools aur/android-sdk
```

```bash
sudo systemctl start adb
/opt/android-sdk/platform-tools/adb devices
/opt/android-sdk/platform-tools/adb shell
```

# Ubuntu

```bash
apt-get install android-tools-adb
```

# adb devices ()

 La primera vez que ejecutemos este comando debe ser obligatoriamente como root, ya que iniciará el 'daemon' que nos unirá a los dispositivos.
 Este comando nos listará los dispositivos conectados, asignándoles un identificador (solo necesario si tenemos más de uno conectado)

```bash
adb shell
```

 Entramos en el terminal del teléfono

```bash
adb push <local> <remote>    - copy file/dir to device
adb pull <remote> [<local>]  - copy file/dir from device
adb sync [ <directory> ]     - copy host->device only if changed
adb remount                  - remounts the /system partition on the device read-write
```

Mostrar paquetes

```bash
adb shell cmd package list packages
```

```bash
adb install /home/adrian/paquete.app
adb install [-l] [-r] [-s] [--algo <algorithm name> --key <hex-encoded key> --iv <hex-encoded iv>] <file>
                               - push this package file to the device and install it
                                 ('-l' means forward-lock the app)
                                 ('-r' means reinstall the app, keeping its data)
                                 ('-s' means install on SD card instead of internal storage)
                                 ('--algo', '--key', and '--iv' mean the file is encrypted already)
  si falla mirar si tenemos activado: Settings > Additional Settings > Developer Options > Developer options: Check the Install via USB option.

adb uninstall [-k] <package> - remove this app package from the device
                                '-k' means keep the data and cache directories
```

Mirar logs de android

```bash
adb logcat
adb logcat -T 50
# como tail -n 50 -f
```

# Descargar apk instalado

Primero obtener el nombre

```bash
adb shell pm list packages
```

Obtener el path del .apk

```bash
adb shell pm path com.example.someapp
```

Bajar el apk

```bash
adb pull /data/app/com.example.someapp-2.apk path/to/desired/destination
```

# adb con root

Settings -> Developer options -> Root access

# Listar paquetes

```bash
adb shell 'pm list packages -f' | sed -e 's/.*=//' | sort
```

With google play links, no matter the app installer:

## all third-party apps (slow because of pm)

```bash
adb shell "echo $'<!DOCTYPE html><html><head><title>My Apps</title></head><body>'; pm list packages -3 | sed -e 's/-.*//' | sed -e 's/.*://' | sort | while read -r line; do echo $'<a href="https://play.google.com/store/apps/details?id='$line$'" target="_blank">'$line$'</a><br/>'; done; echo $'</body></html>'" > ./myapps.html
```

## external apps only (at least on marshmallow), assuming only one expandable device, and might include duplicates

```bash
adb shell "echo $'<!DOCTYPE html><html><head><title>My Apps</title></head><body>'; ls /mnt/expand/$(ls /mnt/expand/ | head)/app | sed -e 's/-.*//' | sed -e 's/.*://' | sort | while read -r line; do echo $'<a href="https://play.google.com/store/apps/details?id='$line$'" target="_blank">'$line$'</a><br/>'; done; echo $'</body></html>'" > ./myapps.html
```

# Llamar / dial

```bash
adb shell am start -a android.intent.action.CALL -d tel:+CCXXXXXXXXXX
```

# Recovery

arrancar en recovery

```bash
adb reboot recovery
```

Otros modos de boot:

```bash
adb reboot fastboot
adb reboot bootloader
```

# Instalar .zip

```bash
adb reboot sideload
adb sideload open_gapps-arm64-10.0-pico-20220126.zip
```

# root

```bash
adb root
```

Tenemos que permitirlo en las opciones de developer, buscar por "adb".

Ahora cuando hagamos

```bash
adb shell
```

ya seremos root

# port forward

Exponer el puerto 8080 del móvil en el 8888 de nuestro pc

```bash
adb forward tcp:8080 tcp:8888
```

# Remote ADB

<https://developer.android.com/tools/adb>

<https://github.com/jarhot1992/Remote-ADB>
