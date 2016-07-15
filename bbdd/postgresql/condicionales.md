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
