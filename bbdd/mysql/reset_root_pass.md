echo "UPDATE mysql.user SET Password=PASSWORD('root') WHERE User='root'; FLUSH PRIVILEGES;" > reset.sql
mysqld_safe --init-file=reset.sql
