Para algunas cosas puede venir bien paste

Manual: http://www.semicomplete.com/blog/articles/week-of-unix-tools/day-5-xargs.html

adrian@adrian-Presario:/tmp$ cat test.txt 
linea1 param1 param2
linea2
linea3 cosa1
linea4
linea5
linea6 otra

adrian@adrian-Presario:/tmp$ cat test.txt | xargs echo
linea1 param1 param2 linea2 linea3 cosa1 linea4 linea5 linea6 otra

Para tratar correctamente los cambis de línea. No vale para ejecutar el comando por cada línea
adrian@adrian-Presario:/tmp$ cat test.txt | xargs -0 echo
linea1 param1 param2
linea2
linea3 cosa1
linea4
linea5
linea6 otra

Usar -n1 para ejecutar el comando una vez por cada línea.
Con -L 1 nos da un parametro por cada línea, teniendo en cuenta que puede tener espacios en blanco

adrian@adrian-Presario:/tmp$ cat test.txt | xargs -n2 echo
linea1 param1
param2 linea2
linea3 cosa1
linea4 linea5
linea6 otra

adrian@adrian-Presario:/tmp$ cat test.txt | xargs -I {} echo 00 {} 11
00 linea1 param1 param2 11
00 linea2 11
00 linea3 cosa1 11
00 linea4 11
00 linea5 11
00 linea6 otra 11


Coge los 4 primeros elementos separados por espacios ("Oct  7 01:00:36")
Los trata linea por línea (sin líneas vacías): -L1
Coge el input y lo asocia al caracter '='
Y ejecutamos el comando: date +%s -d"Oct  7 01:00:36"
$ echo "Oct  7 01:00:36 adrian-Presario anacron[15891]" | cut -d' ' -f 1-4 | xargs -L1 -i= date +%s -d=
1381100436


Borrar ficheros mas antiguos de 7 días de forma eficiente (de 20 en 20 y con 4 procesos en paralelo)
find /var/lib/puppet/reports/ -type f -ctime +7 -print0 | xargs -0 -P 4 -n 20 rm -f
  -print0 y -0 hace que se pasen bien ficheros con espacios en blanco y caracteres raros


xargs -r
  no ejecutarse si el stdin esta vacío
