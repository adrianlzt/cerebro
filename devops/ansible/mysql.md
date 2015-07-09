http://docs.ansible.com/mysql_user_module.html
http://docs.ansible.com/mysql_db_module.html

Requires the MySQLdb Python package on the remote host. For Ubuntu, this is as easy as apt-get install python-mysqldb.


# Paquete necesario para manejar mysql desde ansible
- name: install python mysqldb to manage mysql from ansible
  yum: name=MySQL-python state=present

# Create a new database with name 'bobdata'
- mysql_db: name=bobdata state=present

# Copy database dump file to remote host and restore it to database 'my_db'
- copy: src=dump.sql.bz2 dest=/tmp
- mysql_db: name=my_db state=import target=/tmp/dump.sql.bz2

# Create database user with name 'bob' and password '12345' with all database privileges
- mysql_user: name=bob password=12345 priv=*.*:ALL state=present
