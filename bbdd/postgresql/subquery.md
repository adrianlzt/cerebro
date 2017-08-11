https://www.postgresql.org/docs/8.1/static/functions-subquery.html

Hace la query si la subquery tiene algun resultado:
SELECT col1 FROM tab1
    WHERE EXISTS(SELECT 1 FROM tab2 WHERE col2 = tab1.col2);


expression IN (subquery)

expression NOT IN (subquery)

expression operator ANY (subquery)

expression operator SOME (subquery)
