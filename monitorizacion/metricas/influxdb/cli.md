Obtener todas las DBs en una lista (salvo _internal):
influx -format csv -execute "SHOW DATABASES" | cut -d , -f 2 | egrep -v -e "^name$" -e "^_internal$"
