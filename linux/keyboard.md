https://wiki.archlinux.org/index.php/KEYMAP


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


Si queremos reorganizar lo haremos como:

xmodmap -e "keycode 75 = Print"


Cambiar que sin pulsar fn, la tecla "ins / impr pa" sea insert, y con fn sea imprimir pantalla:
xmodmap -e "keycode 118 = Print"
xmodmap -e "keycode 107 = Insert"
