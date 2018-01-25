https://stackoverflow.com/questions/29016271/how-to-get-latest-values-for-each-group-with-an-elasticsearch-query

Tenemos elementos que se indexan cada cierto tiempo.
Queremos obtener el último de cada uno de ellos.

Primero agregamos por el término que los diferencia.
Luego, dentro de esa agregación cogemos solo el top(1) ordeandor por tiempo desc (el último)
