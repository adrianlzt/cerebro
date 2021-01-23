# HypoPG
https://hypopg.readthedocs.io/en/latest/
Extensión que simula tener una partición para ver si el query planner la usaría. Sin tener que gastar los recursos de crearla


# pg_partman
https://github.com/pgpartman/pg_partman
https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman_howto_native.md
  explicación paso a paso de como hacerlo (no existía cuando escribí esta guía)
https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md

Extensión que nos facilita crear las particiones.
Unicamente llamar a una función para convertir una tabla en parent.
Podemos activar un worker que trae que se encargue de crear las tablas child automáticamente.

Para PG11 no parece mucho el beneficio que da.
Crear las tablas automáticamente lo hace con un background worker, que la docu de postgres recomienda mejor no usar.
Las tablas tienen que haberse creado a priori con la partition activada (https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md#creation-functions)
Crea una tabla _default donde van las cosas que no caen en ninguna partition.
CUIDADO! Si se meten datos futuros en default, cuando partman vaya a intentar crear esas particiones fallará, y si no nos damos cuenta, empezará a meter todos los datos en default. Mirar en la sección de monitoring

The PG Jobmon extension (https://github.com/omniti-labs/pg_jobmon) is optional and allows auditing and monitoring of partition maintenance

Ejemplo de uso: https://github.com/Doctorbal/zabbix-postgres-partitioning#create-partitioned-tables

Tenemos RPM de partman en https://yum.postgresql.org/12/redhat/rhel-7-x86_64/

Para build a partir del .src.rpm:
https://git.postgresql.org/gitweb/?p=pgrpms.git;a=tree;f=rpm/redhat/master/pg_jobmon/master;hb=HEAD
rpmbuild -ba SPECS/pg_jobmon.spec -D 'pgmajorversion 12' -D 'pginstdir /usr/pgsql-12'


Para hacer el build en una centos 7:
En una máquina con postgres instalado, con los repos oficiales de yum, instalar:
yum install -y centos-release-scl pgxnclient
yum install -y postgresql12-devel gcc openssl-devel llvm5.0 llvm-toolset-7 devtoolset-7 llvm-toolset-7-clang
pip3.6 install six
pgxnclient install pg_partman

Instalará:
/usr/pgsql-12/share/extension/pg_partman.control
/usr/pgsql-12/share/extension/pg_partman--*
  para hacer actualizaciones entre versiones
/usr/pgsql-12/share/extension/pg_partman--4.2.2.sql
/usr/pgsql-12/lib/pg_partman_bgw.so
/usr/pgsql-12/lib/bitcode/src/pg_partman_bgw/src/pg_partman_bgw.bc
/usr/pgsql-12/lib/bitcode/src/pg_partman_bgw.index.bc
/usr/pgsql-12/bin/check_unique_constraint.py
/usr/pgsql-12/bin/dump_partition.py
/usr/pgsql-12/bin/reapply_indexes.py
/usr/pgsql-12/bin/vacuum_maintenance.py
/usr/pgsql-12/doc/extension/migration_to_partman.md
/usr/pgsql-12/doc/extension/pg_partman.md
/usr/pgsql-12/doc/extension/pg_partman_howto.md


Cargar la shared lib:
alter system set shared_preload_libraries = pg_partman_bgw;
  lo meterá en DATADIR/postgresql.auto.conf, parámetro shared_preload_libraries
  También podemos meterlo nosotros en /etc/postg.../postgresql.conf
  valores separados por coma. Comprobar antes si ya tenemos algún valor definido: show shared_preload_libraries ;
  para poner varios: alter system set shared_preload_libraries = pgaudit,pg_stat_statements,pg_partman_bgw;

Necesita reinicio:
systemctl restart postgresql-12

Crear un nuevo schema en nuestra db para almacenar la info de partman:
CREATE SCHEMA partman;
CREATE EXTENSION pg_partman SCHEMA partman; -- cargar la extension en el schema partman, para no inteferir con nuestros datos. Crea tablas, funciones, vistas, etc

En este momento podemos ver las tablas y funciones que crea partman:
\df partman.*
\dt partman.*


Crear usuario (para particionado nativo no necesitamos un superuser):
CREATE ROLE partman WITH LOGIN;
GRANT ALL     ON                   SCHEMA partman TO partman;
GRANT ALL     ON ALL TABLES     IN SCHEMA partman TO partman;
GRANT EXECUTE ON ALL FUNCTIONS  IN SCHEMA partman TO partman;
GRANT EXECUTE ON ALL PROCEDURES IN SCHEMA partman TO partman;  -- PG11+ only
GRANT ALL     ON                   SCHEMA my_partition_schema TO partman; -- darle permiso en el schema donde vayamos a poner las particiones

Deberán quedar los permisos (borrado el user postgres por legibilidad):

zabbix=# \l
                                  List of databases
   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges
-----------+----------+----------+-------------+-------------+-----------------------
 zabbix    | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | zabbix_rw=c/postgres +
           |          |          |             |             | zabbix_ro=c/postgres +
           |          |          |             |             | partman=c/postgres   +
           |          |          |             |             | jobmon=c/postgres
(4 rows)

zabbix=# \dn+
                          List of schemas
  Name   |  Owner   |  Access privileges   |      Description
---------+----------+----------------------+------------------------
 jobmon  | postgres | partman=U/postgres  +|
         |          | jobmon=U/postgres    |
 partman | postgres | partman=UC/postgres  |
 public  | postgres | zabbix_rw=U/postgres+| standard public schema
         |          | zabbix_ro=U/postgres+|
         |          | partman=UC/postgres +|
         |          | jobmon=U/postgres    |


Configuramos en que db, con que role/user va a funcionar y con que periodicidad (mejor meterlo en un fichero de config):
alter system set pg_partman_bgw.interval = 3600;
alter system set pg_partman_bgw.role = partman;
alter system set pg_partman_bgw.dbname = pruebas;

/etc/postgresql/12/data/conf.d/partman.conf
pg_partman_bgw.interval = 3600
pg_partman_bgw.role = partman
pg_partman_bgw.dbname = zabbix


## Configurar particionado
Todos los ejemplos usando particionado nativo >=PG10.

Antes de llamar a partman, tenemos que tener creada la tabla parent tipo partition:
create table history(time int, value int) partition by range(time);

Creamos particionado daily basado en la columna "time" de la tabla "public.history" (tenemos que especificar siempre el schema).
Podemos especificar un intervalo de partición tipo tiempo porque le estamos diciendo que "time" es epoch en segundos (p_epoch).
También creará 10 particiones del futuro cada vez (nos da un margen por si dejase de funcionar el partman).
select partman.create_parent('public.history', 'time', 'native', 'daily', p_premake := 10, p_epoch := 'seconds' );

Luego tendremos que definir el retention y poner el infinite_time_partitions=true (para que siempre cree las tablas aunque no tengamos datos, mirar https://github.com/pgpartman/pg_partman/issues/303#issuecomment-613038035)
UPDATE partman.part_config SET retention_keep_table=false, retention='{{table.retention}}' WHERE parent_table = '{{table.name}}';
UPDATE partman.part_config SET infinite_time_partitions=true;

Podemos ver las particiones creadas con:
\d+ history

Se crean automáticamente o ha sido el worker?


Si queremos mover datos que han caído en la tabla "default" a particiones podemos usar la función: partition_data_proc() (más en sección monitoring)



La función run_maintenance() es la que tendremos que llamar periódicamente para crear las particiones.
CUIDADO al ejecutar este comando, ya que podremos estar creando las tablas con otro owner que luego el bgwriter no pueda tocar.
SELECT "partman".run_maintenance(p_analyze := false, p_jobmon := true);
  aqui le decimos que use jobmon para registrar el resultado y que p_analze a false (no hace falta en pg11+)
Si tenemos cargado el background worker (bgw), él se encargará de estas llamadas.
Si queremos llamar a mano mejor llamar a run_maintenance_proc()

Si solo queremos ejecutarlo sobre una tabla:
SELECT partman.run_maintenance('public.history_str', p_jobmon := 't', p_debug := 't');

undo_partition()
mover los datos de las particiones a la tabla parent y hacer unattach las partitions


## Ver particionado configurado
select parent_table,control,partition_interval,premake from partman.part_config;



## Monitoring
Nos dice si hay datos en las tablas default, cosa que no debería. Puede indicarnos que están llegando datos del futuro o del pasado (tablas ya borradas).
select * from  partman.check_default(false);
  devuelve una linea por cada tabla default con valores

Si queremos sacar una query para usar como monitorización (que nos de >0 si tenemos cosas en default):
select count(*) from  partman.check_default(false);

check_default(true) es bastante costoso.

CUIDADO! Si se meten datos futuros en default, cuando partman vaya a intentar crear esas particiones fallará, y si no nos damos cuenta, empezará a meter todos los datos en default.
Si queremos mover datos que han caído en la tabla "default" a particiones podemos usar la función: partition_data_time() (mirar también partition_data_proc)
Aquí (https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md#about) se explica que no se autocrean las particiones porque podría tener un coste muy alto en la db.

Si queremos mover los datos que estén en la tabla "default" a sus particiones correspondientes usaremos:
CALL partman.partition_data_proc('public.history_text');
Esto creará las particiones necesarias y moverá ahi los datos, dejando vacía la tabla default.
A parte de monitorizar si la tabla default tiene rows, podemos meter un cron que ejecute esta tarea cada cierto tiempo (menos que el premake, para evitar que no dejemos crear las particiones por ese dato futuro).
Esta función es bastante lenta.
1' para 6000 rows, aunque parece que depende más de cuantas particiones se vean afectadas que del número.


Mirar si todos los jobs de partman se están ejecutando bien (más info sobre jobs en jobmon.md):
SELECT t.alert_text || c.alert_text AS alert_status
FROM jobmon.check_job_status() c
JOIN jobmon.job_status_text t ON c.alert_code = t.alert_code;


En los logs de postgres se ve al arrancar:
2020-03-04 18:21:51.429 UTC user= db= host= pid=29163 sess=5e5ff1bf.71eb: LOG:  pg_partman master background worker master process initialized with role partman

Y cada vez que se ejecuta el "maintenance":
2020-03-04 18:21:51.454 UTC user= db= host= pid=29165 sess=5e5ff1bf.71ed: LOG:  pg_partman dynamic background worker (dbname=zabbix) dynamic background worker initialized with role partman on database zabbix
2020-03-04 19:56:24.127 UTC user= db= host= pid=13084 sess=5e6007e8.331c: LOG:  pg_partman dynamic background worker (dbname=zabbix): SELECT "partman".run_maintenance(p_analyze := false, p_jobmon := true) called by role partman on database zabbix



Número esperado de tablas particionadas VS al número real de particiones.
Cuidado, si aún no ha pasado suficiente tiempo el número de particiones aún puede ser menor al esperado.
WITH partman AS (
  select
    split_part(parent_table, '.', 2) as table,
    partition_interval,
    premake,
    retention,
    EXTRACT(
      EPOCH
      FROM
        retention :: interval
    ) / EXTRACT(
      EPOCH
      FROM
        partition_interval :: interval
    ) + premake as expected_partitions
  from
    partman.part_config
),
partitioned_tables AS (
  select
    relname
  from
    pg_catalog.pg_class c
    LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  WHERE
    c.relkind = 'p'
),
partition_count AS (
  select
    p.parentrelid as parent_table,
    count(*) as count
  from
    partitioned_tables,
    pg_partition_tree(partitioned_tables.relname :: varchar) p
    join pg_class c on (p.relid = c.oid)
  where
    isleaf
    and pg_get_expr(relpartbound, relid) <> 'DEFAULT'
  group by
    p.parentrelid
)
select
  partman.*,
  partition_count.count as partition_count,
  partman.expected_partitions - partition_count.count as missing_tables
from
  partman
  join partition_count on partman.table = partition_count.parent_table :: varchar
order by
  partman.table;




## Retention
Solo se borrarán las particiones que tengan todos sus datos más antiguos que el threshold que marquemos.

Tenemos que modificar la tabla a mano para definir el retention.

Consultar la config:
select parent_table,retention,retention_schema,retention_keep_table,retention_keep_index from partman.part_config;

RETENTION tiene que ser un interval válido de postgres
UPDATE partman.part_config SET retention_keep_table=false, retention='RETENTION' WHERE parent_table = 'TABLE';


## BGW / background worker
Lo único que hace es ejecutar run_maintenance() para las particiones que tengan configurado automatic_maintenance=true


## Debug
Mirar que está haciendo run_maintenance()
CALL partman.run_maintenance_proc(p_jobmon := true, p_debug := true);

Si solo queremos ejecutarlo sobre una tabla (tenemos que poner "public."):
SELECT partman.run_maintenance('public.history_str', p_jobmon := 't', p_debug := 't');

Código: https://github.com/pgpartman/pg_partman/blob/d28670fbf56757442b8b6fb33e750f032f561a71/sql/functions/run_maintenance.sql

Coge la config:
SELECT parent_table , partition_type , partition_interval , control , premake , undo_in_progress , sub_partition_set_full , epoch , infinite_time_partitions , retention FROM partman.part_config WHERE undo_in_progress = false AND parent_table = 'public.history_uint';

Comprobamos que la tabla parent existe.

Obtenemos el tipo de dato por el que estamos particionando (time o id)
SELECT general_type FROM partman.check_control_type('public', 'history_str', 'clock');

Se muestra la expresión usada para particionar (si estamos en debug), ejemplo:
NOTICE:  run_maint: v_partition_expression: to_timestamp(clock)

Se muestra, si estamos en debug, la tabla parent y la última partición, ejemplo:
NOTICE:  run_maint: parent_table: public.history_str, v_last_partition: history_str_p2020_03_27_1300

Ahora se divide la ejecución según si tenemos que hacer un split por tiempo o por id.
Por aquí sigo explicando el caso con división por tiempo.

Se ejecuta partman.drop_partition_time(parent_table) si tenemos configurado retention (borrado de particiones antiguas)
select partman.drop_partition_time('public.history_str');
Devuelve el número de tablas dropeadas.
En caso de que solo quede una partición, devolverá un error y no la dropeará.

Obtenemos el comienzo del intervalo de la última partición que existe:
SELECT child_start_time FROM partman.show_partition_info('public.history_str_p2020_03_27_1300', '01:00:00', 'public.history_str');

Aqui hay dos opciones para definir el valor de current_partition_timestamp
Si infinite_time_partitions=true, lo ponemos a now()
Si infinite_time_partitions=false, buscará por todas las particiones el valor máximo del particionado. Lo que quiere es obtener el último valor que ser insertó.

En caso de no obtener ningún valor en las particiones, buscará en la tabla default el valor máximo (lo pondrá en v_max_time_parent)

Si tenemos debug, mostrará el valor máximo encontrado y las particiones y el la tabla default.

Si el valor máximo de la tabla default es superior al current, se calculará el current_partition_timestamp basado en ese valor (por ejemplo, si el último dato es a las 13:05:04 y estamos particionando por hora, definirá current_partition_timestamp a 13:00:00)






# Partitioning
https://wiki.postgresql.org/wiki/Table_partitioning
A partir de la versión 10 meten "Declarative Partitionning"
https://www.postgresql.org/docs/current/ddl-partitioning.html

\d+ nombre
  para ver la tabla y sus partitions

\dP to list partitioned tables and indexes
  version 12

## Declarative partitioning
A partir de PG10 existe la posibilidad de crear particiones en las tablas de forma nativa.

Mejoras de particionado en pg12: https://www.2ndquadrant.com/en/blog/partitioning-enhancements-in-postgresql-12

Elegir el número de particiones es dificil: https://www.postgresql.org/docs/current/ddl-partitioning.html#DDL-PARTITIONING-DECLARATIVE-BEST-PRACTICES
Parece que mejor por debajo de miles.

Se puede particionar por rango, hash o lista.
CREATE TABLE test(id int) PARTITION BY RANGE (id);

Podemos crear una tabla "default" donde caerán todos los valores que no hagan match en ninguna otra tabla (podremos seguir creando tablas partition una vez creada la default):
CREATE TABLE history_default PARTITION OF history DEFAULT;
Si miramos (\d+ history_default) la tabla veremos que las condiciones se van poniendo dinámicamente para matchear el resto de casos que no estén definidos en otras tablas.
CUIDADO! si tenemos un valor del partition key en la tabla default, por ejemplo, el 5, no podremos crear una partición que contenga el valor 5. Tendremos que moverlo a mano.

Al hacer estos create table obtendremos un AccessExclusiveLock sobre la tabla padre (no permitimos a nadie ni leer ni escribir, y tenemos que esperar a que todos terminen de leer/escribir).

Si creamos un índice en la tabla parent, se crearán automáticamente en las tablas child.

CUIDADO! Adding or removing a partition to or from a partitioned table requires taking an ACCESS EXCLUSIVE lock on the parent table
Reducir la creación borrado de tablas a un mínimo de operaciones.

CUIDADO! No podemos usar foreign keys desde otras tablas hacia una tabla particionada.
A partir de la versión 12 si se puede.
Pero si declaramos una primary key, el valor por el que particionemos debe estar en esa primary key.


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

Tabla con los schema, tables y partition_key
select c.relnamespace::regnamespace::text as schema,
       c.relname as table_name,
       pg_get_partkeydef(c.oid) as partition_key
from   pg_class c
where  c.relkind = 'p';  -- partitioned table

Tipo de una tabla particionada: relkind='r'

Tablas child y sus rangos
select c.relname as table_name, pg_get_expr(relpartbound, c.oid) as partbound from pg_class c where c.relispartition=true and c.relkind='r';


Tablas child de la tabla parent nombreTablaParent:
select  p.*,
        pg_get_expr(relpartbound, relid) as partbound,
        pg_get_partkeydef(relid) as partkey
from    pg_partition_tree('nombreTablaParent') p join
        pg_class c on (p.relid = c.oid);


Tablas parent particionadas:
select
  relname
from
  pg_catalog.pg_class c
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE
  c.relkind = 'p';


Cuantas particiones hay por cada tabla (sin contar el parent ni la default):
WITH partitioned_tables AS (
  select
    relname
  from
    pg_catalog.pg_class c
    LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  WHERE
    c.relkind = 'p'
)
select
  p.parentrelid,
  count(*)
from
  partitioned_tables,
  pg_partition_tree(partitioned_tables.relname :: varchar) p
  join pg_class c on (p.relid = c.oid)
where
  isleaf
  and pg_get_expr(relpartbound, relid) <> 'DEFAULT'
group by
  p.parentrelid;



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






# Querys contra tablas particionadas
Si usamos "now()" (o valores dinámicos), esos valores no se pueden usar para filtrar tablas particionadas.

https://stackoverflow.com/questions/30446526/partition-pruning-based-on-check-constraint-not-working-as-expected/30448533#30448533

https://stackoverflow.com/questions/47360199/postgres-query-partitioned-table-on-current-date
http://www.peterhenell.se/msg/PostgreSQL---Partition-Exclusion-with-nowcurrent_timestampcurrent_date

Si estamos filtrando tablas con algo tipo "clock > ROUND(EXTRACT(EPOCH FROM (now() - INTERVAL '10 min')))" podemos crear una función que retorne el timestamp inmutable:

CREATE FUNCTION f_epoch_immutable()
  RETURNS integer AS
$func$
SELECT (ROUND(EXTRACT(EPOCH FROM now())))::integer
$func$  LANGUAGE sql IMMUTABLE;

Y cambiamos por: "clock > f_epoch_immutable() - 3600"
Tardando un orden de magnitud menos.

