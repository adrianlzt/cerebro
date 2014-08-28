Para mostrarlos
:set list

Para ocultarlos
:set list!

http://stackoverflow.com/questions/1675688/make-vim-show-all-white-spaces-as-a-character


Si nos ponemos encima de un caracter y pulsamos 'ga' nos dirá su código en decimal, hexadecimal y octal.
Luego podremos usarlo por ejemplo para hacer una substitución:
:%s/\%xYY/substitute/g
Siendo YY el código hexadecimal

http://stackoverflow.com/questions/2798398/how-to-search-and-replace-an-unprintable-character

Otra opción es copiar el caracter (nos ponemos encima y ejecutamos 'y espacio', o 'y1').
Luego pulsamos ':%s/' y para meter el caracter pulsamos control+r, y seguimos con '/sustitucion/g'
