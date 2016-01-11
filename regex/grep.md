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
