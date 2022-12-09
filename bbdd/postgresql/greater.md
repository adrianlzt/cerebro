El mayor de dos columnas:
SELECT id, GREATEST(column1, column2) FROM table1;

También útil:
select id, GREATEST(max(column1), max(column2)) FROM table1 GROUP BY id;
