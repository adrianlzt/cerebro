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

adrian@adrian-Presario:/tmp$ cat test.txt | xargs -0 echo
linea1 param1 param2
linea2
linea3 cosa1
linea4
linea5
linea6 otra

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

