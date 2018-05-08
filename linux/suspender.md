http://askubuntu.com/questions/1792/how-can-i-suspend-hibernate-from-command-line/131022#131022

dbus-send --system --print-reply  --dest="org.freedesktop.UPower"  /org/freedesktop/UPower  org.freedesktop.UPower.Suspend

Arch linux:
dbus-send --print-reply --system --dest=org.freedesktop.login1 /org/freedesktop/login1 org.freedesktop.login1.Manager.Suspend boolean:true



# Wakeup
Configurar que dispositivos pueden hacer waku-up de suspender
cat /proc/acpi/wakeup

Habilitar/deshabilitar un dispositivo:
echo "XHC" | sudo tee /proc/acpi/wakeup

En mi caso eso XHC era para que el raton inalambrico y el teclado usb puedan hacer wake up.

https://www.reddit.com/r/archlinux/comments/3zxg65/how_to_permanently_change_procacpiwakeup_or/
unit de systemd para deshabilitar en el arranque.
