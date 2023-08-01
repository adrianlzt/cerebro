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



UPDATE tasks
SET owner = NULL
WHERE owner = 'tpetry' AND status = 'open'
RETURNING *;

DELETE FROM tasks
WHERE status = 'finished'
RETURNING *;

INSERT INTO tasks (
  status, owner, name
) VALUES (
  'open', 'tpetry', 'Create Example'
)
RETURNING *;
