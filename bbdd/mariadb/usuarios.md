http://galeracluster.com/documentation-webpages/userchanges.html

La database "mysql" no se replica porque es MyISAM
Esta tabla es la que gestiona los usuarios, por lo que INSERTS/DELETES en esa tabla no se replicarán.

Pero si usamos "CREATE USER"/"DROP USER" si se replicará (a nivel statement).


# Recover password
No me ha funcionado, no me deja cambia la password cuando arranca con --skip-grant-tables
Recover MySQL root password
Step # 1: Stop the MySQL server process.
Step # 2: Start the MySQL (mysqld) server/daemon process with the --skip-grant-tables option so that it will not prompt for a password.
Step # 3: Connect to the MySQL server as the root user.
Step # 4: Set a new root password.
SET PASSWORD FOR 'root'@'localhost' = PASSWORD("newpass");
flush privileges;
