https://di.nmfay.com/postgres-vs-mysql
Cuando usamos INSERT, UPDATE, DELETE podemos pedir a la query que nos devuelva los rows afectados.

INSERT INTO foos (name)
VALUES ('alpha'), ('beta')
RETURNING *;

 id │ name
────┼───────
  1 │ alpha
  2 │ beta
(2 rows)
