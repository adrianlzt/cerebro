Necesitamos tener una bbdd corriendo antes de arrancar el server.

Para postres usando docker:
docker run --name postgres-zabbix -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

Metemos el schema y los datos de inicio:
cd database/postgresql/
psql -h 127.0.0.1 -U postgres postgres -f schema.sql
psql -h 127.0.0.1 -U postgres postgres -f images.sql
psql -h 127.0.0.1 -U postgres postgres -f data.sql
  si fallase, reintentar


Cambiaremos la config de zabbix_server.conf para poner:
DBUser=postgres
DBPassword=postgres
DBName=postgres


sbin/zabbix_server
  -c fichero.conf
  -f  correr en foreground

Por defecto los logs van a /tmp/zabbix_server.log (mirar opcion LogFile)

Estará escuchando en el puerto 10051


# Frontend
docker run --rm -it -p 80:80 --link postgres-zabbix:postgres-server -e POSTGRES_USER="postgres" -e POSTGRES_PASSWORD="postgres" -e POSTGRES_DB=postgres zabbix/zabbix-web-nginx-pgsql:alpine-trunk

  si queremos modificar el codigo php (por ejemplo, para usar una rama del svn) metemos: -v "$PWD:/usr/share/zabbix"

Default admin user:
Admin:zabbix

Si no tenemos configurado el frontend (/etc/zabbix/web/zabbix.conf.php) veremos una pantalla de configuración donde conectaremos con la database y el server zabbix
Si usamos docker, el script de arranque configurará todo lo necesario con las variables de entorno.
