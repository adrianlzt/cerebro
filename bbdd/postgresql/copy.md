http://blog.endpoint.com/2013/11/copying-rows-between-postgresql.html

psql test -c "\copy (SELECT i, t FROM original_table ORDER BY i) TO STDOUT" > /tmp/f.tsv
cat /tmp/f.tsv | psql test -c "\copy copy_table (i, t) FROM STDIN"

Podemos quitar tambien el (i,t) si estamos copiando todas las columnas con "SELECT *"
