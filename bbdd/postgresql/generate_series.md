https://www.postgresql.org/docs/9.1/static/functions-srf.html

SELECT * FROM generate_series(2,4);


SELECT * FROM generate_series('2008-03-01 00:00'::timestamp, '2008-03-04 12:00', '10 hours');
