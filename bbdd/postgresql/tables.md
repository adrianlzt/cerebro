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

Modificar un field tipo texto a jsonb (el using me lo dice que lo ponga, porque si no no sabe como hacer el cast de los valores):
alter table main_host alter column variables type jsonb USING variables::jsonb;




# Tabla con una PRIMARY KEY formada por dos valores
CREATE TABLE films (
    code        char(5),
    title       varchar(40),
    did         integer,
    date_prod   date,
    kind        varchar(10),
    len         interval hour to minute,
    CONSTRAINT code_title PRIMARY KEY(code,title)
);
