Mostrar lenguajes instalados:
select * from pg_language; 

Lenguajes disponibles (pero puede que necesitemos instalar algún paquete):
select * from pg_pltemplate;

Cargar un lenguaje:
CREATE LANGUAGE plpythonu;
La activación es por cada database


# Python
https://www.postgresql.org/docs/9.1/static/plpython.html
https://www.postgresql.org/docs/8.1/static/plpython-database.html
mirar copiar_entorno.sql

yum install -y postgresql-plpython.x86_64
sql> CREATE LANGUAGE plpythonu;

Ejemplo:
CREATE OR REPLACE FUNCTION fnfileexists(IN afilename text) RETURNS boolean AS
$$
    import os
    return os.path.exists(afilename)
$$
LANGUAGE 'plpythonu' VOLATILE;


--testing the function --
SELECT fnfileexists(E'/tmp/test.htm')


Ejemplo accediendo a la bbdd:
test=# CREATE OR REPLACE FUNCTION test() RETURNS text AS
$$
  import plpy
  return plpy.execute("SELECT 1 as columna")[0]["columna"]
$$
LANGUAGE 'plpythonu' VOLATILE;
CREATE FUNCTION

test=# select test();
 test 
------
 1
(1 row)

## Logging
plpy.notice("cosa");
  notice y mas graves estan activados por defecto

plpy.debug(msg), plpy.log(msg), plpy.info(msg), plpy.notice(msg), plpy.warning(msg), plpy.error(msg), and plpy.fatal(msg)

## Query
import plpy
q = plpy.execute("SELECT * FROM tabla;")

Devuelve un objecto PLyResult

q.nrows()
  devuelve el numero de rows de la respuesta

q.rows
  array con la respuesta


## Functión para comprobar argumentos
CREATE OR REPLACE FUNCTION check_args(IN env TEXT, IN old_proj TEXT, IN new_proj TEXT) RETURNS text AS
$$
  if env != "pre" and env != "prod":
    raise Exception("env debe ser \"'pre'\" o \"'prod'\"")
  return "0"
$$
LANGUAGE 'plpythonu' VOLATILE;

