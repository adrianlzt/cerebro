https://www.postgresql.org/docs/8.1/static/functions-subquery.html

Hace la query si la subquery tiene algun resultado:
SELECT col1 FROM tab1
    WHERE EXISTS(SELECT 1 FROM tab2 WHERE col2 = tab1.col2);


expression IN (subquery)

expression NOT IN (subquery)

expression operator ANY (subquery)

expression operator SOME (subquery)



Lanzar una query y trabajar con los resultados en otra query.
Nos vale por si estamos realizando alguna operación en el select:
SELECT
  itemid,clock,delta
FROM
  (SELECT itemid,clock,value,value-lag(value) OVER(order by clock) AS delta FROM partitions.history_uint_2019_01_25 WHERE itemid=369838 ORDER BY clock DESC LIMIT 10) a
WHERE a.delta=0;
