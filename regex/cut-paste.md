Manual: http://www.semicomplete.com/blog/articles/week-of-unix-tools/day-2-cut-and-paste.html

cut -d, -f2-4
Separa por comas, y me enseña las columnas 2,3 y 4

cut -d, -f1,4,8

echo test | rev | cut -c 2- | rev
Corta los dos ultimos caracteres
