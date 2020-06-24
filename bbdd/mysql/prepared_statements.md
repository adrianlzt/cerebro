https://mariadb.com/kb/en/prepare-statement/
https://dev.mysql.com/doc/refman/8.0/en/sql-prepared-statements.html

Preescribir una query para luego pasar solo los parámetros y ejecutar.
No me queda claro si son statements que puedes dejar permanentemente y usar, o están pensados para crearlos, usarlos y destruirlos.


Mirar cuantos tenemos:
SHOW GLOBAL STATUS LIKE '%prepared_stmt_count%';
