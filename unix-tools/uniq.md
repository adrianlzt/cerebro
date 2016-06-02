Suelta solo las cadenas disitintas que estén juntas.

echo "a
a
a
a
b
b
a" | uniq

b
a


uniq -c 
  cuenta ocurrencias

sha1sum * | rev | sort | uniq -f 1 | rev
  saco los sha1sum de todos los ficheros, los ordeno segun su sha1, hago "uniq" solo por el primer campo.



Contar cuantas lineas se producen en un fichero de log
http://www.commandlinefu.com/commands/view/5482/count-occurrences-per-minute-in-a-log-file
Ejemplo, trazas por minuto para maillog:
cat maillog | cut -c 1-12 | uniq -c
