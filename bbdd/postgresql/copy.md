https://www.postgresql.org/docs/current/sql-copy.html
http://blog.endpoint.com/2013/11/copying-rows-between-postgresql.html

"\copy" es un comando de psql.

Copiar de un fichero o a un fichero

psql -d zabbix -c "\COPY history TO history.csv CSV"
psql -d zabbix -c "\COPY (SELECT * FROM history) TO history.csv CSV"
  si queremo especificar algo de una tabla, o es particionada, usar este formato de (SELECT ...)



También se puede enviar a otros formatos: binary o text
O enviarlo a un programa para comprimirlo al vuelo:
COPY country TO PROGRAM 'gzip > /usr1/proj/bray/sql/country_data.gz';

Ejemplo copiano varias tablas particionadas a .csv.gz:
for i in history history_uint history_log history_str history_log trends trends_uint; do
PGPASSWORD=postgres psql -h localhost -U postgres -d zabbix -c "\COPY (SELECT * FROM $i) TO PROGRAM 'gzip > $i.csv.gz'"
done

cat /tmp/f.tsv | psql test -c "\copy copy_table (i, t) FROM STDIN"

Podemos quitar tambien el (i,t) si estamos copiando todas las columnas con "SELECT *"


Para cargar un fichero desde la consola de psql:
\i fichero.sql
