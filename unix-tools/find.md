Haz un grep en los ficheros que terminen en .cfg y muestra el nombre y la línea donde se he encontrado el match

find . -iname "*.cfg" -exec grep -Hn "RHN Satellite Web Service Check" '{}' \;

-H, --with-filename
              Print the file name for each match.  This is the default when there is more than one file to search.
-n, --line-number
              Prefix each line of output with the 1-based line number within its input file.  (-n is specified by POSIX.)


Busca con expresion regular casi insensitive
Busco ficheros que terminen con uno o mas numeros
find . -iregex ".+[0-9]+$" -type f


Nos hace un resumen de los tipos de ficheros que tenemos en este directorio y sus subdirectorios
find . -exec file {} \; | grep -o ":[^,]*" | sort | uniq -c | sort -nr
