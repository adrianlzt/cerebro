Mejora: bat.md


Escribir contenido a un fichero hasta que escribamos END:

$ cat <<END > fichero_salida
> las cosas
> que queremos
> escribir en el fichero
END


cat -i
  -v, --show-nonprinting

cat -n
  muestra el numero de linea.
  Tambien podemos hacerlo con "nl"
