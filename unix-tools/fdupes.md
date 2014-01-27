Find duplicates
Busca ficheros iguales comparando por su SHA.

A mano:
shasum *.jpg | awk {'print $1'} | sort | uniq -c | grep -v -E "^ *1 "
