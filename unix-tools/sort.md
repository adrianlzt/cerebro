Ordenar por números bien
ls | sort -g
Ordena bien cuando tenemos el típico problema de
fichero1.jpg
fichero10.jpg
fichero11.jpg
...

numeric sort:
git tag -l | sort -n
0.4.3
0.4.4
0.10.0
0.11.0
0.11.1


Cuidado con LC_ALL / LANG

git tag -l | LANG=es_ES.UTF-8 sort -n
0.4.3
0.4.4
0.10.0
0.11.0
0.11.1


git tag -l | LANG=en_US.UTF-8 sort -n
0.11.7
0.11.8
0.2.0
0.3.0
0.4.0


Desordenar
sort --random-sort


Ordenar por una columna determinada
sort -k 4
