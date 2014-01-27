Mostrar tablas:
\d
\d+ <- agrega tamaño y descripción

Información sobre su estructura
\d+ tabla

Mostrar tablas con los privilegios asociados:
\dp <- list table, view, and sequence access privileges
\dp tabla


## Crear y borrar tablas ##
http://www.postgresql.org/docs/devel/static/sql-createtable.html
http://www.postgresql.org/docs/devel/static/sql-droptable.html

CREATE TABLE nombre (col1 CHAR(20, ...);
DROP TABLE nombre;

CREATE TABLE distributors (
     id    serial PRIMARY KEY,
     name   varchar(40) NOT NULL CHECK (name <> '')
);


## Modificar tabla ##
http://www.postgresql.org/docs/devel/static/sql-altertable.html

ALTER TABLE nombre 
  ADD COLUMN nombrecol date_type
  DROP COLUMN nombrecol 
  ALTER COLUMN nombre
    TYPE tipo
    SET DEFAULT expresion
    DROP DEFAULT
    SET|DROP NOT NULL
 ...

Eliminar NOT NULL de checks.command_line
ALTER TABLE checks ALTER COLUMN command_line DROP NOT NULL;
