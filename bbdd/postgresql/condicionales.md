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

