https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html

Arrancar con --skip-grant-tables
mysql> FLUSH PRIVILEGES;
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';


Otra forma:
echo "UPDATE mysql.user SET Password=PASSWORD('root') WHERE User='root'; FLUSH PRIVILEGES;" > reset.sql
mysqld_safe --init-file=reset.sql
