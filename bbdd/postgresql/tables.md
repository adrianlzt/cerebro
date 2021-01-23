Mostrar tablas:
\d
\d+ <- agrega tamaño y descripción

Información sobre su estructura
\d+ tabla

Mostrar tablas con los privilegios asociados:
\dp <- list table, view, and sequence access privileges
\dp tabla

Si queremos obtener el código SQL que se ha usado para crear la tabla:
pg_dump NOMBREBBDD -t NOMBRETABLA --schema-only


## Crear y borrar tablas ##
http://www.postgresql.org/docs/devel/static/sql-createtable.html
http://www.postgresql.org/docs/devel/static/sql-droptable.html

Se pueden añadir comentarios a las tablas y/o columnas. Mirar comment.md

CREATE TABLE nombre (col1 CHAR(20, ...);
DROP TABLE nombre;

Tabla temporal (desaparece cuando cerramos la sesión):
CREATE TEMP TABLE nombre (col1 text);
  se crean en el schema pg_temp_NN

CREATE TABLE distributors (
     id    serial PRIMARY KEY,
     name   varchar(40) NOT NULL CHECK (name <> '')
     ejemplo text default 'prueba'
);

Crear si no existe
CREATE TABLE IF NOT EXISTS ...

Crear con datos de ejemplo (una columna foo con una serie):
CREATE TABLE foo as select generate_series(1,100) bar;


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

Modificar un int a bool:
ALTER TABLE exec ALTER COLUMN exec_on_success TYPE bool USING exec_on_success::int::bool;


## Renombrar
ALTER TABLE table_name RENAME TO new_table_name;


## Cambiar owner
alter table <tabla> owner to <role>;


## Modificar varias tablas

DO
$$
DECLARE
    row record;
BEGIN
    FOR row IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' -- and other conditions, if needed
    LOOP
        EXECUTE 'ALTER TABLE public.' || quote_ident(row.tablename) || ' SET SCHEMA [new_schema];';
    END LOOP;
END;
$$;


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



# Constraints
https://www.postgresql.org/docs/current/ddl-constraints.html

Podemos meter constraints para:
  - chequear que un valor cumple una regla
  - valores únicos
  - referencia a claves de otras tablas (foreign key)
  - borrar los elementos de la tabla si la key referenciada se borra (ON DELETE CASCADE)

Podemos ver las relaciones con \d+ nombretabla

Crear tabla con relación a la columna de otra tabla:
CREATE TABLE zabbix (
 server varchar(128) PRIMARY KEY,
 registrada sino NOT NULL,
 FOREIGN KEY (server) REFERENCES inventario(server) ON DELETE CASCADE
);


Chequear foreign keys de todo el schema:
WITH foreign_keys AS (
    SELECT
      conname,
      conrelid,
      confrelid,
      unnest(conkey)  AS conkey,
      unnest(confkey) AS confkey
    FROM pg_constraint
    WHERE contype = 'f' -- AND confrelid::regclass = 'your_table'::regclass
)
-- if confrelid, conname pair shows up more than once then it is multicolumn foreign key
SELECT fk.conname as constraint_name,
       fk.confrelid::regclass as referenced_table, af.attname as pkcol,
       fk.conrelid::regclass as referencing_table, a.attname as fkcol
FROM foreign_keys fk
JOIN pg_attribute af ON af.attnum = fk.confkey AND af.attrelid = fk.confrelid
JOIN pg_attribute a ON a.attnum = conkey AND a.attrelid = fk.conrelid
ORDER BY fk.confrelid, fk.conname
;



# Crear una tabla copiando a otra
create table new (
    like old
    including all
);

Si "old" está particionada, "new" no heredará esa propiedad (no será particionada)
Tendremos que especificarlo
create table new (
    like old
    including all
) PARTITION BY RANGE (clock);



# Unlogged tables
Estas tablas no tienen ficheros WAL.
Si tenemos un crash, estas tablas no se podrán recuperar.
Más rápidas porque no tienen que escribir en WAL.

Normalmente usadas en casos donde podemos regenerar los datos, por ejemplo si cargamos unos .csv

Los backups tampoco tendrán estos datos.



# pg_catalog
Podemos abrir con "psql -E" y ejecutar los comandos \xxx para ver lo que ejeutan.

Normally, one should not change the system catalogs by hand, there are normally SQL commands to do that

Tenemos la vista pg_tables que es más sencilla.


Tablas del schema public
select
  relname
from
  pg_catalog.pg_class c
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE
  c.relkind = 'r' OR c.relkind = 'p'
  AND n.nspname = 'public'
  AND pg_catalog.pg_table_is_visible(c.oid);

Para mostrar tablas particionadas:
c.relkind = 'p'
