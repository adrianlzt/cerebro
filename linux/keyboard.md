https://wiki.archlinux.org/index.php/KEYMAP

https://wiki.archlinux.org/title/Xorg_(Espa%C3%B1ol)/Keyboard_configuration_(Espa%C3%B1ol)
entender como se configura el teclado, de donde vienen las configuraciones, cambiarlas, etc

localectl set-x11-keymap es pc105 '' caps:escape
  para fijar una configuración. Modifica /etc/X11/xorg.conf.d/00-keyboard.conf

También uso xmodmap ~/.Xmodmap para cambiar algunas teclas (ç es /)


http://askubuntu.com/questions/209597/how-do-i-change-keyboards-from-the-command-line
Consola, teclado a español:
loadkeys es

Para las X:
setxkbmap es


# Remap
http://askubuntu.com/questions/296155/how-can-i-remap-keyboard-keys

xev
para conocer que teclas estamos pulsando

KeyPress event, serial 36, synthetic NO, window 0x3000001,
    root 0xd4, subw 0x0, time 757054, (-280,210), root:(773,388),
    state 0x0, keycode 107 (keysym 0xff61, Print), same_screen YES,
    XLookupString gives 0 bytes: 
    XmbLookupString gives 0 bytes: 
    XFilterEvent returns: False

Se ha pulsado (KeyPress) la tecla 107 que tiene la función "Print"


Si queremos reorganizar lo haremos como (xkeycaps, frontend para xmodmap):

xmodmap -e "keycode 75 = Print"

Cada tecla tiene 7 códigos, pulsación normal y luego con los modificadores (mayuscula, alt, control, alt gr, etc)
Key  Shift+Key  Mode_switch+Key  Mode_switch+Shift+Key  ISO_Level3_Shift+Key  ISO_Level3_Shift+Shift+Key

AltGr == ISO_Level3_Shift
Mode_switch era el nombre antiguo de AltGr
La séptima que veo en mi X11 no la encuentro. No se usa?


Cambiar que sin pulsar fn, la tecla "ins / impr pa" sea insert, y con fn sea imprimir pantalla:
xmodmap -e "keycode 118 = Print"
xmodmap -e "keycode 107 = Insert"

https://wiki.archlinux.org/index.php/xmodmap#Custom_table
Mejor hacer los cambios y guardarlos como:
xmodmap -pke > ~/.Xmodmap

O hacer el dump y modificar el fichero.
Se debería cargar solo en el arranque.


Resetear el mapping:
setxkbmap es


Listado de teclas
http://wiki.linuxquestions.org/wiki/List_of_Keysyms_Recognised_by_Xmodmap
https://linux.m2osw.com/compose-key-under-linux-keyboard


https://github.com/alols/xcape
Pulsar un modificador y soltarlo actua como pulsar una tecla.
Por ejemplo, pulsar Ctrl y soltarlo, genera una pulsación de otra tecla.



# Cambiar layout y ejecutar modmap al conectar teclado usb
Para saber el vendor y product, mirar lsusb
Es posible que sobren cosas del usb-keyboard-in

➜ cat /etc/udev/rules.d/00-usb-keyboard.rules
ATTRS{idVendor}=="045e", ATTRS{idProduct}=="07b9", OWNER="adrian"
ACTION=="add", RUN+="/usr/local/bin/usb-keyboard-in_udev"
#ACTION=="remove", RUN+="/usr/local/bin/usb-keyboard-out"

➜ cat /usr/local/bin/usb-keyboard-in_udev
#!/bin/bash
su - adrian -c "/usr/local/bin/usb-keyboard-in" &

➜ cat /usr/local/bin/usb-keyboard-in
#!/bin/bash
sleep 1
DISPLAY=":0"
HOME=/home/adrian/
XAUTHORITY=$HOME/.Xauthority
export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
export DISPLAY XAUTHORITY HOME
setxkbmap -option caps:escape
# Si lo pongo sin el systemd-cat no me funciona. Ni idea de porque
systemd-cat xmodmap ~/.Xmodmap


