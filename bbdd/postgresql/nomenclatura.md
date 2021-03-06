https://wiki.postgresql.org/wiki/Change_management_tools_and_techniques

https://github.com/perseas/Pyrseas
python para generar un yaml/json a partir de un schema de postgres.
Útil para comparar diferentes schemas.
He probado con la db de zabbix pero da un error: KeyError: ('public', 'history_default_itemid_clock_idx')
dbaugment; yamltodb, dbtoyaml son los comandos

http://eulerto.github.io/pgquarrel/
Util para generar deltas de schemas

Comparar schemas
https://stackoverflow.com/questions/2178907/postgres-pg-dump-dumps-database-in-a-different-order-every-time
http://www.cri.ensmp.fr/people/coelho/pg_comparator/
https://www.schemacrawler.com/
  esta también genera gráficos a partir de los schemas de la db



Un host puede tener uno o varios "db servers" (también llamadas "instances").

Dentro de cada "db server" hay una o varias "tablespaces" (por defecto pg_default y pg_global).
Dentro de cada "db server" hay uno o varios "roles" (users o groups).
Dentro de cada "db server" hay una o varias "databases".

Dentro de una "database" tienes 1 o más "schemas". El "schema" por defecto es "public".

Dentro del schema hay tablas, etc.

Tablespaces, usado para poner objetos en otros data dir.
La idea es crear distintos datadirs, que estarán en distintos discos, posíblemente, uno rápido y pequeño y otro grande y lento.
Pondremos determinadas tablas en los discos rápidos y otras en los lentos.
Es el único uso que tiene sentido para los tablespaces.

\db+
para mostrar los tablespaces


# schemas
schemas, para organizar tablas, permisos, etc.
Se parece a un directorio, pero no es jerárquico, no podemos meter schemas en otros schemas.
Un nombre mejor podría ser "namespace".
Por ejemplo, crear un schema para meter varias tablas y permitir a un role el acceso.
Agrupa objetos de una misma database.
Temporary schemas se llaman pg_temp_NN

\dnS+
mostrar schemas (\dn), "S" para mostrar los de sistema, "+" más info.


Se pueden hacer joins entre tablas de diferentes schemas en la misma database.


## Crear schema
CREATE SCHEMA IF NOT EXISTS nombre;
CREATE TABLE IF NOT EXISTS nombre.tabla ...;

## Drop schema
DROP SCHEMA nombre CASCADE;
Esto borrará todas las cosas que cuelgan del schema.


Podemos mover una tabla a otro schema
alter table foo set schema new_schema;


## Usar schema
SELECT * FROM nombre.tabla;

Si no especificamos el schema al hacer la query, se usará el search_path.
Por defecto: $user, public.
CUIDADO! Podemos tener problemas de seguridad si no especificamos el schema. Mirar seguridad.md

Tenemos unos schemas implícitos:
  - pg_temp_NN siempre será buscado primero, si existe (estas solo existen en las sesiones de los usuarios).
  - pg_catalog buscado segundo, a no ser que esté en search_path

El primer schema del search_path se llama "current schema".

SET search_path TO myschema, public;

Mostrar schema actual:
select current_schema();
  mostrar el schema actual sin las implicitas. Quiere decir que es donde creamos tablas por defecto
select current_schemas(true);
  mostrar el search_path con el implicit path



# Functions
Si un usuario no tiene permisos de select, pero pueden ejecutar una función que hace un select, podrá consultar los datos a través de esa función.
Mirar seguridad.md
