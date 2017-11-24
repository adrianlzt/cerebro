Si queremos usar un datadir distinto podemos mover el contenido que tengamos en /var/lib/mysql a ese nuevo dir.
O si queremos generar los fiheros necesarios desde cero haremos:

/usr/bin/mysql_install_db --user=mysql


En el my.cnf habremos definido:
datadir=/some/path

El motor debe estar a MyISAM (si hemos puesto el innodb para galera, deberemos comentarlo antes de ejecutar esto)
