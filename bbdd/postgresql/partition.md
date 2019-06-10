# HypoPG
https://hypopg.readthedocs.io/en/latest/
Extensión que simula tener una partición para ver si el query planner la usaría. Sin tener que gastar los recursos de crearla

# pg_partman
https://github.com/pgpartman/pg_partman
https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md
Extensión que nos facilita crear las particiones.
Unicamente llamar a una función para convertir una tabla en parent.
Podemos activar un worker que trae que se encargue de crear las tablas child automáticamente.

Para PG11 no parece mucho el beneficio que da.
Crear las tablas automáticamente lo hace con un background worker, que la docu de postgres recomienda mejor no usar.
Las tablas tienen que haberse creado a priori con la partition activada (https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md#creation-functions)
Crea una tabla _default donde van las cosas que no caen en ninguna partition.

Ejemplo de uso: https://github.com/Doctorbal/zabbix-postgres-partitioning#create-partitioned-tables



# Partitioning
https://wiki.postgresql.org/wiki/Table_partitioning
A partir de la versión 10 meten "Declarative Partitionning"
https://www.postgresql.org/docs/current/ddl-partitioning.html

\d+ nombre
  para ver la tabla y sus partitions


## Declarative partitioning
A partir de PG10 existe la posibilidad de crear particiones en las tablas de forma nativa.
Se puede particionar por rango, hash o lista.
CREATE TABLE test(id int) PARTITION BY RANGE (id);

Podemos crear una tabla "default" donde caerán todos los valores que no hagan match en ninguna otra tabla (podremos seguir creando tablas partition una vez creada la default):
CREATE TABLE history_default PARTITION OF history DEFAULT;
Si miramos (\d+ history_default) la tabla veremos que las condiciones se van poniendo dinámicamente para matchear el resto de casos que no estén definidos en otras tablas.
CUIDADO! si tenemos un valor del partition key en la tabla default, por ejemplo, el 5, no podremos crear una partición que contenga el valor 5. Tendremos que moverlo a mano.

Si creamos un índice en la tabla parent, se crearán automáticamente en las tablas child.

CUIDADO! Adding or removing a partition to or from a partitioned table requires taking an ACCESS EXCLUSIVE lock on the parent table
Reducir la creación borrado de tablas a un mínimo de operaciones.

CUIDADO! No podemos usar foreign keys desde otras tablas hacia una tabla particionada.


Si usamos RANGE algunos detalles:
FROM ('A') to ('B')  quiere decir [A,B)
El valor A caerá en quien lo defina en el "FROM".
Podemos ver con \d+ tabla_partition la regla exacta que se le ha puesto (>= o >, etc)

Podemos usar los valores especiales (MINVALUE) y (MAXVALUE) para definir el -infinito y +infinito


enable_partition_pruning=on  // por defecto
Este parámetro hace que el query planner descarte las tablas que por su range no van a tener el dato.
Para inheritance el parámetro que hace esta funcion es constraint_exclusion


### Subpartitioning
partitioning on one LIST (e.g., device) and one RANGE (e.g., time) dimension first requires creating all LIST partitions and then, in each of those child tables, creating corresponding RANGE sub-partitions, or vice versa. This creates a tree hierarchy of tables where the leafs are the effective sub-partitions that hold tuples.


### Attach / detach
Podemos unir tablas como particiones de un parent, o sacar childs de una tabla parent.
Podemos por ejemplo, sacar la tabla default y volverla a unir solo con un rango determinado.

No podemos hacer attach de la misma tabla a dos parents distintas.

Podemos usar detach para sacar una tabla de una parent a modo de "cold bucket", manteniendo los datos pero evitando que se hagan queries sobre esa tabla vieja.
Aunque esto no tiene pinta de tener mucho beneficio, ya que cuando se hace un scan lo primero que mira postgres es si debe analizar cada tabla segun sun range

ALTER TABLE measurement ATTACH PARTITION measurement_y2008m02 FOR VALUES FROM ('2008-02-01') TO ('2008-03-01' );
  hacer un attach puede llevar tiempo. he visto 45" para 20GB
ALTER TABLE measurement DETACH PARTITION measurement_y2006m02;

Sacar, renombrar, unir (una default en una "normal"):
alter table history_log detach partition history_log_default;
alter table history_log_default rename to history_log_1459567933_1560211200;
alter table history_log attach PARTITION history_log_1459567933_1560211200 FOR VALUES FROM ('1459567933') to ('1560211200');




### Ejemplo
CREATE TABLE history (
  itemid                   bigint                                    NOT NULL,
  clock                    integer         DEFAULT '0'               NOT NULL,
  value                    numeric(16,4)   DEFAULT '0.0000'          NOT NULL,
  ns                       integer         DEFAULT '0'               NOT NULL
) PARTITION BY RANGE (clock);

CREATE TABLE history_1000_2000 PARTITION OF history FOR VALUES FROM ('1000') to ('2000');

Y como se ve con \d+
                                     Table "public.history"
 Column |     Type      | Collation | Nullable | Default | Storage | Stats target | Description
--------+---------------+-----------+----------+---------+---------+--------------+-------------
 itemid | bigint        |           | not null |         | plain   |              |
 clock  | integer       |           | not null | 0       | plain   |              |
 value  | numeric(16,4) |           | not null | 0.0000  | main    |              |
 ns     | integer       |           | not null | 0       | plain   |              |
Partition key: RANGE (clock)
Partitions: history_1000_2000 FOR VALUES FROM (1000) TO (2000)



### Queries para extraer info
https://www.postgresql.org/docs/current/catalog-pg-partitioned-table.html
https://www.postgresql.org/docs/current/catalog-pg-class.html
  relpartbound: If table is a partition (see relispartition), internal representation of the partition bound
  esto parece que es lo más parecido a sacar con una SQL la info de como se hace el particionado de forma programática


SELECT pg_get_partkeydef('history'::regclass);
  nos dice el tipo de partition de la tabla "history"

SELECT pg_get_partition_constraintdef('history_1555891200_1555977600'::regclass);
  contraints de la partición "history_1555891200_1555977600"

select c.relnamespace::regnamespace::text as schema,
       c.relname as table_name,
       pg_get_partkeydef(c.oid) as partition_key
from   pg_class c
where  c.relkind = 'p';  -- partitioned table
  tabla con los schema, tables y partition_key

Tipo de una tabla particionada: relkind='r'

Para cuando esté PG12
https://gist.github.com/amitlan/97dbed8c7c3f49be7579782ba22c9ced
select  p.*,
        pg_get_expr(relpartbound, relid) as partbound,
        pg_get_partkeydef(relid) as partkey
from    pg_partition_tree('p') p join
        pg_class c on (p.relid = c.oid);




### Errores
Si hacemos un select sobre una tabla sin partitions, no devolverá error.

Si intentamos insertar un dato en una tabla partitioned y ningún child cumple el range del valor que queremos insertar, fallará el insert.
  ERROR:  no partition of relation "history" found for row

Si intentamos crear dos particiones que se sobrepongan en el tramo de valores que tienen asignados, fallará la creación:
  ERROR:  partition "history_1500_2000" would overlap partition "history_1000_2000"

Si intentamos crear una tabla para un rango donde un valor ya existe (en la tabla default se entiende) dará un error:
  ERROR:  updated partition constraint for default partition "history_default" would be violated by some row

Si intentamos crear una foreign key hacia una tabla particionada:
  ERROR:  cannot reference partitioned table "products"

When an UPDATE causes a row to move from one partition to another, there is a chance that another concurrent UPDATE or DELETE will get a serialization failure error
  code 40001




# Version < 10, inheritance
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


Comprobar que constraint_exclusion no está desactivado.
Si está desactivado el query planner comprobará todas las tablas child al hacer una query (aunque sus contraints diga que ahí no va a estar el dato).


# Errores
Bloqueado borrado una partición, mirar a ver si está el vacuum ejecutándose.
