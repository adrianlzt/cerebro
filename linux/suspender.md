http://askubuntu.com/questions/1792/how-can-i-suspend-hibernate-from-command-line/131022#131022

dbus-send --system --print-reply  --dest="org.freedesktop.UPower"  /org/freedesktop/UPower  org.freedesktop.UPower.Suspend

Arch linux:
dbus-send --print-reply --system --dest=org.freedesktop.login1 /org/freedesktop/login1 org.freedesktop.login1.Manager.Suspend boolean:true
