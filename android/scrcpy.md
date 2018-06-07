https://github.com/Genymobile/scrcpy/blob/master/README.md

Controlar un movil por USB


yay -S scrcpy-prebuiltserver
scrcpy

Tenemos que tener adb, el movil conectado y con el usb debugging activado.

click on HOME	Ctrl+h | Middle-click
click on BACK	Ctrl+b | Right-click²
click on APP_SWITCH	Ctrl+s
click on MENU	Ctrl+m
click on POWER	Ctrl+p
turn screen on	Right-click²
paste computer clipboard to device	Ctrl+v
install APK from computer	drag & drop APK file


# Wireless
https://www.genymotion.com/blog/open-source-project-scrcpy-now-works-wirelessly/
El movil debe estar en la misma red wifi
Obtener su ip:
adb shell ip -4 -o a

Configurar adb sobre TCP/IP
adb tcpip 5555

Conectar via TCP/IP
adb connect 192.168.2.14:5555

Desconectar el movil del usb
scrcpy

Reducir el ancho de banda usado:
scrcpy --bit-rate 2M --max-size 800

Para volver al modo adb normal:
adb usb
