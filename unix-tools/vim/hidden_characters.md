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


# Caracteres matemáticos (griegos y otros símbolos)
http://www.alecjacobson.com/weblog/?p=443
Para ver el listado
:digraphs

Para escribirlo:
control+k MN

Donde MN serán los valores que hemos visto en :digraphs
También podemos usar el valor hex que aparece con control+v
control+v u 00a9 (en digraphs vemos que es el número 169, que en hex es A9)
©

Por ejemplo, para theta minúscula:
control+k h*
θ

Greek letters are usually their Latin alphabet “equivalent” then star, with capitals taking capital (uppercase) Latin letters, likewise for lowercase. I included some (what I use most) here.

Para escribir superscripts(³) o subscripts(₃) haremos:
control+k Número s
  subscript
control+k Número S
  superscript

Ejemplo:
control+k 3s ₃
control+k 8S ⁸
