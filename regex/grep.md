mirar ripgrep.md (rg) más rápido


grep -l cosas *
Nos saca los ficheros que han hecho match

grep -L cosas *
Nos sacan los ficheros que no han hecho match

grep -h cosa *
Solo saca el match, no el nombre del fichero

grep -c ...
cuenta ocurrencias

grep -o ...
  solo nos devuelve el trozo de linea que matchea

grep -3 cosa fichero
muestra tres lineas por encima y por debajo

cat fichero | grep -A 5 -B 1 cosa
Muestra 5 lineas despues del match y 1 antes

cat fichero | grep -Pzo '.*something(.*\n)*'
muestra el contenido del fichero desde la linea que matchee something hasta el final del fichero
  -P: perl regex
  -z: match new lines
  -o: only show matched


find /tmp -name "*.txt" -exec grep -Hn cosa {} \;
Busca en los ficheros que terminen en .txt dentro de /tmp la palabra "cosa".
Nos devuelve el fichero matcheado (-H) y el número de línea (-n)


Quita los comentarios y las líneas en blanco
cat fichero.cnf | grep -v  -e "^#" -e "^$"


Sacar tamaño ficheros que solo ocuren Megas o Gigas
du -hsc * | egrep "^[0-9,]+[MG]"


ps aux | grep pr[o]ceso  #Truco para que el propio grep no aparezca

grep -q cosa Fichero || echo "No hay cosa en Fichero"


Expresiones regulares con egrep
^ (Caret)        =    match expression at the start of a line, as in ^A.
$ (Question)     =    match expression at the end of a line, as in A$.
\ (Back Slash)   =    turn off the special meaning of the next character, as in \^.
[ ] (Brackets)   =    match any one of the enclosed characters, as in [aeiou].
                      Use Hyphen "-" for a range, as in [0-9].
[^ ]             =    match any one character except those enclosed in [ ], as in [^0-9].
. (Period)       =    match a single character of any value, except end of line.
* (Asterisk)     =    match zero or more of the preceding character or expression.
\{x,y\}          =    match x to y occurrences of the preceding.
\{x\}            =    match exactly x occurrences of the preceding.
\{x,\}           =    match x or more occurrences of the preceding.


Quitar ficheros binarios:
grep -I ...

Tratar ficheros binarios como texto (necesario para ficheros codigo fuente de c):
grep -a ... fichero.c

fgrep "$" pepe.txt
no trata la busqueda como una expresion regex


Varios grep en un unico comando:
awk '/pattern1/ && /pattern2/'


# Internals
Grep solo envia al stdout cuando encuentra un cambio de linea

# Line buffer
Por defecto cuando grep sale a tty esta activado el modo line-buffered, con esto deberian salir los datos por pantalla segun van llegando siempre que haya un cambio de linea.
Si por el contrario el stdout se redirige a un pipe, no se activa este modo y se envian los datos al stdout cada 4096 bytes (y haya un cambio de linea)

En centos6 cada 4096 bytes, pero en arch no escupe nada nunca.
En centos, si concatenamos un grep con un cat (tail -f x | grep "1" | cat), cuando grep reciba 4096 bytes (en centos6) los enviará a cat.
Tambien hay que tener en cuenta que grep no enviará nada a stdout hasta ver un cambio de linea.
Podemos observarlo con strace.

Si concatenamos dos grep, el segundo grep, aunque lleve line-buffered no saca nada hasta completar un bloque de 4096 + 1 caracter.

El efecto es que si contatenamos dos greps la salida no será las últimas líneas (cuando lo usamos con un continuos stream).
Si vamos a usarlo con tail -f usar como:
tail -f file | grep --line-buffered my_pattern

Para estudiar el efecto podemos usar:
tail -f texto | strace grep 1 2> strace1 | strace grep 1 2> strace2
tail -f strace1
tail -f strace2
python3 -c "print('1'*4096, end='')" >> texto
O en python2:
python2 -c "from __future__ import print_function; print('\n', end='')" >> texto
