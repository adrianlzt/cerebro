Control del terminal android desde un pc:

Para permitirlo tenemos que ir a las opciones de desarrollo y habilitar "Depuracion USB"

# Arch
yaourt -S android-sdk-platform-tools aur/android-sdk

sudo systemctl start adb
/opt/android-sdk/platform-tools/adb devices
/opt/android-sdk/platform-tools/adb shell


# Ubuntu
apt-get install android-tools-adb



# adb devices ()
	La primera vez que ejecutemos este comando debe ser obligatoriamente como root, ya que iniciará el 'daemon' que nos unirá a los dispositivos.
	Este comando nos listará los dispositivos conectados, asignándoles un identificador (solo necesario si tenemos más de uno conectado)

$ adb shell
	Entramos en el terminal del teléfono

adb push <local> <remote>    - copy file/dir to device
adb pull <remote> [<local>]  - copy file/dir from device
adb sync [ <directory> ]     - copy host->device only if changed
adb remount                  - remounts the /system partition on the device read-write

adb install -s /home/adrian/paquete.app
adb install [-l] [-r] [-s] [--algo <algorithm name> --key <hex-encoded key> --iv <hex-encoded iv>] <file>
                               - push this package file to the device and install it
                                 ('-l' means forward-lock the app)
                                 ('-r' means reinstall the app, keeping its data)
                                 ('-s' means install on SD card instead of internal storage)
                                 ('--algo', '--key', and '--iv' mean the file is encrypted already)
adb uninstall [-k] <package> - remove this app package from the device

Mirar logs de android
adb logcat
