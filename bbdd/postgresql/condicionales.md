http://www.techonthenet.com/sql/not.php
https://www.postgresql.org/docs/8.4/static/plpgsql-control-structures.html

SELECT *
FROM suppliers
WHERE supplier_name NOT IN ( 'IBM', 'Hewlett Packard', 'Microsoft' );



IF demo_row.sex = 'm' THEN
    pretty_sex := 'man';
ELSE
    IF demo_row.sex = 'f' THEN
        pretty_sex := 'woman';
    END IF;
END IF;

# null
NULL


# insert
Pequeño truco que nos permite hacer un condicional en el insert.
En este caso, estamos haciendo insert de "VALUES('x','y')" si la tabla jobmon.dblink_mapping_jobmon está vacía:
with j as (select 'x' as username, 'y' as pwd where (select count(*)=0 from jobmon.dblink_mapping_jobmon))
INSERT into jobmon.dblink_mapping_jobmon (username,pwd) select username,pwd from j;



# Operadores de comparación
https://www.postgresql.org/docs/current/functions-comparison.html

Cuidado con NULL.
Si alguno de los operadores es NULL, la operación devolverá NULL:

> SELECT ('2018-03-11 02:30'::timestamp > NULL) IS NULL;
 ?column?
----------
 t



# case
SELECT a,
       CASE WHEN a=1 THEN 'one'
            WHEN a=2 THEN 'two'
            ELSE 'other'
       END
    FROM test;

select CASE WHEN (select count(*) from update_cte) = 0 THEN 'no hay cambios' ELSE 'cambios:'||t END AS output from dummy left join update_cte on 1=1

