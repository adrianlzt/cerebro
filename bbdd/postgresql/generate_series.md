https://www.postgresql.org/docs/9.1/static/functions-srf.html

SELECT * FROM generate_series(2,4);

SELECT * FROM generate_series(0,5);
Nos da valores del 0 al 5 incluidos


SELECT * FROM generate_series('2008-03-01 00:00'::timestamp, '2008-03-04 12:00', '10 hours');



Ejemplo usando valores generados por dos series en una subquery:
SELECT time, priority,
  (
    SELECT time||' '||priority as valores_subquery
  )
FROM
  generate_series(1540355027, 1540355997, 300) as time,
  generate_series(0,5,1) AS priority;
