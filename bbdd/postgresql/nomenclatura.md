Un host puede tener uno o varios "db servers" (también llamadas "instances").

Dentro de cada "db server" hay una o varias "tablespaces" (por defecto pg_default y pg_global).
Dentro de cada "db server" hay uno o varios "roles" (users o groups).
Dentro de cada "db server" hay una o varias "databases".

Dentro de una "database" tienes 1 o más "schemas". El "schema" por defecto es "public".

Dentro del schema hay tablas, etc.

Tablespaces, usado para poner objetos en otros data dir.
La idea es crear distintos datadirs, que estarán en distintos discos, posíblemente, uno rápido y pequeño y otro grande y lento.
Pondremos determinadas tablas en los discos rápidos y otras en los lentos.

\db+
para mostrar los tablespaces


schemas, para organizar tablas, permisos, etc.
Se parece a un directorio, pero no es jerárquico, no podemos meter schemas en otros schemas.
Un nombre mejor podría ser "namespace".
Por ejemplo, crear un schema para meter varias tablas y permitir a un role el acceso.
Agrupa objetos de una misma database.
Temporary schemas se llaman pg_temp_NN

\dnS+
mostrar schemas (\dn), "S" para mostrar los de sistema, "+" más info.


Se pueden hacer joins entre tablas de diferentes schemas en la misma database.
