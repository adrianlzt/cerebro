https://wiki.archlinux.org/index.php/Fonts#Console_fonts


Fuentes disponibles:
fc-list


https://github.com/jaagr/polybar/wiki/Fonts#freetype-fonts

gucharmap
Mirar fonts instaladas, codigos, etc
gucharmap is a convenient utility for browsing selected fonts. Filter View > By Unicode Block + Show only glyphs from this font and navigate to Private Use Area. If you find an icon in gucharmap but don't know which font it's from, you can hover over it and right click to display the font.


https://github.com/stark/siji/blob/master/view.sh
xfd
script para mostrar los caracteres de una fuente
solo los que interesan, gucharmap muestra muchas cosas, entiendo que de otras fuentes
xfd -fa "DejaVu Sans Mono"




Para obtener un caracter:
echo "\uXXXX"

Depende de las fuentes que usamos se renderizará de una manera u otra


Para ver que fuentes usa una terminal podemos usar lsof
lsof -c termite | grep fonts


gtk2fontsel
nos muetras las fuentes instaladas, sus opciones y un render de como queda


La fuente que se elige es la que se encuente antes en este fichero y esté instalada:
/etc/fonts/conf.avail/60-latin.conf


# DMG
Si queremos cargar una fuente de mac, vendrá en un formato .dmg
Usaremos varias vecez "7z x" para descomprimir los distintos ficheros.
https://securitronlinux.com/debian-testing/install-mac-osx-fonts-on-linux-easily/


# nerd fonts
ttf-jetbrains-mono-nerd

Para testear si salen los iconos usar:
https://raw.githubusercontent.com/ryanoasis/nerd-fonts/master/bin/scripts/test-fonts.sh
