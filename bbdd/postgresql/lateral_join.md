https://di.nmfay.com/postgres-vs-mysql
A lateral join is fundamentally similar to a correlated subquery, in that it executes for each row of the current result set. However, a correlated subquery is limited to returning a single value for a SELECT list or WHERE clause; subqueries in the FROM clause run in isolation. A lateral join can refer back to information in the rest of the result set:

CREATE TABLE docs (id serial, body jsonb);

INSERT INTO docs (body) VALUES ('{"a": "one", "b": "two"}'), ('{"c": "three"}');

SELECT docs.id, keys.*
FROM docs
JOIN LATERAL jsonb_each(docs.body) AS keys ON TRUE;

 id │ key │  value
────┼─────┼─────────
  1 │ a   │ "one"
  1 │ b   │ "two"
  2 │ c   │ "three"
(3 rows)
