http://www.postgresql.org/docs/8.1/static/backup.html

pg_dump dbname > outfile

Backup de todas las bases de datos:
pg_dumpall > outfile

Restaurar
createdb dbname
psql dbname < infile
 o
psql -f infile postgres


Con compresión
  pg_dump dbname | gzip > filename.gz
Restauración
  createdb dbname
  gunzip -c filename.gz | psql dbname
