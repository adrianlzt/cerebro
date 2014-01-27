http://dev.mysql.com/doc/refman/5.0/en/mysql-secure-installation.html

mysql_secure_installation es recomendado para las instalaciones de servidores en producción.
Realiza los siguientes pasos:
You can set a password for root accounts.
You can remove root accounts that are accessible from outside the local host.
You can remove anonymous-user accounts.
You can remove the test database (which by default can be accessed by all users, even anonymous users), and privileges that permit anyone to access databases with names that start with test_.

Lo mismo podemos ejecutarlo con un par de comandos:
/usr/bin/mysql -uroot -e "DELETE FROM mysql.user WHERE User=''; DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1'); DROP DATABASE IF EXISTS test; FLUSH PRIVILEGES;" mysql
/usr/bin/mysqladmin -u root password "docker"

Cuidado con borrar usuarios directamente de la tabla mysql, porque en un cluster esta tabla no se replica por ser MyISAM
