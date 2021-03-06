https://www.postgresql.org/docs/8.1/static/sql-createfunction.html
http://www.postgresql.org/docs/8.0/static/functions-binarystring.html
https://www.postgresql.org/docs/current/functions-info.html

\df
\df+ function_name

Podemos llamar a funciones especificando un parámetro sin tener que definir todos:
Ejemplo de función: create_parent(p_parent_table text, p_control text, p_type text, p_interval text, ...
Ejemplo de llamada: SELECT create_parent('schema.table', 'xx', 'aa', p_interval := 'daily' ...
Siempre tendremos que definir los parámetros que no tengan default.

Postgres usa overloading functions, mismo nombre con distintos parámetros.

CREATE OR REPLACE FUNCTION test() RETURNS text AS
...
LANGUAGE 'xxx';


"security invoker", la query se corre con los permisos del user que la corre.
"SECURITY DEFINER", se corre con los permisos de quien la creó, es como el SUID bit en UNIX.
Cuidado con la seguridad aquí.

Volatility / cache
Al crear una función podemos definir para que cache el resultado.
Se usa para "pure functions", que el output siempre está definido por los parámetros de entrada.
Solo se reusa el resultado en una misma query (statement).

IMMUTABLE
VOLATILE (por defecto)
STABLE (para casos donde lee de la db, no me queda muy claro)


Mostrar lista de funciones:
select * from pg_proc;
  procnamespace es el catalog


# Editar funciones
\ef nombre
Abre un editor (lo que tengamos en EDITOR) para editar la función.
Si tenemos varias con el mismo nombre tendremos que especificar los tipos de los parámetros:
\ef nombre(int, int)
NOTA al final poner ";" y enter para guardar


# PL/pgSQL
https://www.postgresql.org/docs/current/plpgsql.html
CREATE FUNCTION inc(val integer) RETURNS integer AS $$
BEGIN
RETURN val + 1;
END; $$
LANGUAGE PLPGSQL;


Formatear strings
https://www.postgresql.org/docs/current/functions-string.html#FUNCTIONS-STRING-FORMAT
%s string
%I SQL identifier, double-quoting if necessary
%L SQL literal

%4$s cuarto parámetro como string



# Crear función python
CREATE EXTENSION plpythonu;
CREATE FUNCTION pymax (a integer, b integer)
  RETURNS integer
AS $$
  if a > b:
    return a
  return b
$$ LANGUAGE plpythonu;




# Funciones para strings y otras
https://www.postgresql.org/docs/current/functions-string.html

Concatenar strings de dos columnas distintas:
select name||'.'||apellido as NombreCompleto from usuarios;

usuarios
--------
Juan-Ramirez
Pepe-Martinez


Dividir por un caracter y coger una de las partes:
select split_part('foo.bar', '.', 2);
bar

lower('AAA')
lowercase

replace('abcdefabcdef', 'cd', 'XX')


## New line
El caracter newline es E'\n'


## substring
substring('Thomas' from 2 for 3)
substring('Thomas' from '...$')
substring('Thomas' from '%#"o_a#"_' for '#')


## select string_to_array('ftp,dns',',');
 string_to_array
 -----------------
  {ftp,dns}

Coger un elemento (1 es el primer elemento)
array[1]
array[1:3]
(string_to_array('ftp,dns',','))[1]

length del array
array_length(array[1,2,3], 1)
  longitud de la primera dimensión

Elegir elementos según los valores de un array
# select id,name from services WHERE name = ANY(string_to_array('ftp,dns',','));


# Convertir una serie de resultados a una string separada por comas
select array_to_string(array(select name from projects),',') AS cosa, id FROM tabla;



# Cast
'xxx'::text
'xxx'::char
  nos devuelve solo el primer caracter



# Truncate
left("qwerty", 2) -> qw
right("qwerty", 2) -> ty



# Function optimization
Postgres no puede saber el coste, debe ser el desarrollador de la función el que meta esos datos como metadatos.
Será un valor fijo.
ALTER FUNCTION myFunc {COST c} {ROWS w};




# Funciones para obtener datos de postgres
https://www.postgresql.org/docs/current/functions-info.html



# Debug

## RAISE (prints)
https://www.postgresql.org/docs/current/plpgsql-errors-and-messages.html

RAISE DEBUG 'hola';
RAISE NOTICE 'Calling cs_create_job(%)', v_job_id;

Por defecto al cliente se le envían niveles >=NOTICE (INFO siempre se le envía)
https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-CLIENT-MIN-MESSAGES

A los logs del server: https://www.postgresql.org/docs/current/runtime-config-logging.html#GUC-LOG-MIN-MESSAGES
Por defecto >= WARNING
