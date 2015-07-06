Cerrar pipes:
comando 1>&- 2>&-


stderr a stdout
comando >&


Subshell que actua como un fichero.
El contenido entre paréntesis será como si fuera el contenido de un fichero
$ cat <(echo "hola")
hola

$ cat $(echo "hola")
cat: hola: No existe el fichero o el directorio

