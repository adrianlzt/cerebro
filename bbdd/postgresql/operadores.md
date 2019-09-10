https://www.postgresql.org/docs/8.1/static/sql-createfunction.html
http://www.postgresql.org/docs/8.0/static/functions-binarystring.html

\df`
\df+ function_name

Postgres usa overloading functions, mismo nombre con distintos parámetros.

CREATE OR REPLACE FUNCTION test() RETURNS text AS
...
LANGUAGE 'xxx';


"security invoker", la query se corre con los permisos del user que la corre.
Si quitamos ese parámetro, se corre con los permisos de quien la creó, es como el SUID bit en UNIX.



# Funciones ya definidas
Concatenar strings de dos columnas distintas:
select name||'.'||apellido as NombreCompleto from usuarios;

usuarios
--------
Juan-Ramirez
Pepe-Martinez


## New line
El caracter newline es E'\n'


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
