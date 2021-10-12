https://www.postgresql.org/docs/current/postgres-fdw.html

Lista de fdws:
https://wiki.postgresql.org/wiki/Foreign_data_wrappers

Para hacerlos en python:
https://multicorn.org/

Ejemplo:
https://github.com/rdunklau/logfdw



https://di.nmfay.com/postgres-vs-mysql
Nos permite usar SELECT para obtener datos de otra fuente, por ejemplo, un csv, otra DBMS, una API, etc.

Podemos hacer nuestros propios wrappers en python con http://multicorn.org/


Esqueleton: https://bitbucket.org/adunstan/blackhole_fdw


# CSV
## Exportar
Copiar el FS del server, necesitamos superuser o tener el rol pg_write_server_files
COPY persons TO 'C:\tmp\persons_db.csv' DELIMITER ',' CSV HEADER;

Método usando psql, esscribiendo en local:
\copy hosts TO 'hosts.csv' DELIMITER ',' CSV HEADER;

\copy (select name from hosts) TO 'hosts.csv' CSV HEADER;


Con psql
psql -AtF',' -c "$query"



## Importar
CREATE TABLE xxx (...);
COPY XXX FROM 'fichero';

El servidor tiene que poder acceder al fichero.
Tal vez el unit de systemd tiene limitado postgres para que no pueda acceder a los ficheros del sistema.

Podemos hacer uso de \copy de psql.
En este caso será el binario psql, con los permisos del usuario que lo haya arrancado, quien lea el fichero:
\copy inventario_import FROM '/var/tmp/inventario_SAP_Dic2019.csv' WITH DELIMITER ',' CSV HEADER;


## FDW
https://www.postgresql.org/docs/10/file-fdw.html

Leer un fichero csv como si fuese una tabla.
Tenemos que cargar el fdw de csv.

CREATE EXTENSION file_fdw;
CREATE SERVER import FOREIGN DATA WRAPPER file_fdw;

Luego crear la tabla donde se van a meter los datos (que debe matchear la estructura del csv) y pasarle el fichero que deberá leer.

CREATE FOREIGN TABLE inventario_import (
  entorno varchar(50),
  sistema varchar(50),
  tipo varchar(50),
  ubicacion varchar(10),
  servidor varchar(128),
  descripcion text
) SERVER import OPTIONS ( filename 'inventario.csv', format 'csv' );


Al hacer el select es cuando se leerá.


Si queremos borrar una tabla fdw:
DROP FOREIGN TABLE inventario_import;

Quitar el server:
DROP SERVER import ;
