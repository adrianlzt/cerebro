http://www.techonthenet.com/sql/not.php

SELECT *
FROM suppliers
WHERE supplier_name NOT IN ( 'IBM', 'Hewlett Packard', 'Microsoft' );
