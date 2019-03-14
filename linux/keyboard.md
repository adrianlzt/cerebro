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
