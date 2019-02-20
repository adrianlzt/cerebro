https://www.postgresql.org/docs/9.1/static/functions-srf.html

SELECT * FROM generate_series(2,4);

SELECT * FROM generate_series(0,5);
Nos da valores del 0 al 5 incluidos


SELECT * FROM generate_series('2008-03-01 00:00'::timestamp, '2008-03-04 12:00', '10 hours');
 2008-03-01 00:00:00
 2008-03-01 10:00:00
 2008-03-01 20:00:00
 ...


Serie con columna "from" y columna "to" en formato unix epoch, quitando la que tiene from vacio:
select * from (select lag(a.date) over() as date_from, a.date as date_to from (select ROUND(EXTRACT(EPOCH FROM generate_series('2019-02-19 07:30:00+01'::timestamp, '2019-02-19 07:32:00+01', '1 min'))) as date) a) b where b.date_from > 0;
 date_from  |  date_to
------------+------------
 1550561400 | 1550561460
 1550561460 | 1550561520





Ejemplo usando valores generados por dos series en una subquery:
SELECT time, priority,
  (
    SELECT time||' '||priority as valores_subquery
  )
FROM
  generate_series(1540355027, 1540355997, 300) as time,
  generate_series(0,5,1) AS priority;
