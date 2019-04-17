# HypoPG
https://hypopg.readthedocs.io/en/latest/
Extensión que simula tener una partición para ver si el query planner la usaría. Sin tener que gastar los recursos de crearla

# Partitioning
https://wiki.postgresql.org/wiki/Table_partitioning
A partir de la versión 10 meten "Declarative Partitionning"


https://severalnines.com/blog/guide-partitioning-data-postgresql
Forma antigua de hacerlo (versión < 10).



Podemos particionar las tablas para luego poder borrar datos antiguos más facilmente.

Tendremos una tabla "virtual" donde escribiremos o leeremos. Por debajo se escribirá o leerá de la partición que toque.

Obtener todas las tablas "hijas" de una tabla "virtual".

SELECT i.inhrelid::regclass AS child
FROM   pg_inherits i
WHERE  i.inhparent = 'history'::regclass;

Otra forma:
SELECT
    nmsp_parent.nspname AS parent_schema,
    parent.relname      AS parent,
    nmsp_child.nspname  AS child_schema,
    child.relname       AS child
FROM pg_inherits
    JOIN pg_class parent            ON pg_inherits.inhparent = parent.oid
    JOIN pg_class child             ON pg_inherits.inhrelid   = child.oid
    JOIN pg_namespace nmsp_parent   ON nmsp_parent.oid  = parent.relnamespace
    JOIN pg_namespace nmsp_child    ON nmsp_child.oid   = child.relnamespace
WHERE parent.relname='NOMBRETABLA';



# Errores
Bloqueado borrado una partición, mirar a ver si está el vacuum ejecutándose.
