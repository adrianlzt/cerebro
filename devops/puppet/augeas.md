Sirve para modificar ficheros de configuración.
De esta manera nos ahorramos tener todo el fichero puppetizado, y solo cambiamos lo que nos sea necesario.

class ssh {
  ...
  # Make sure that the root login is not allowed,
  # nothing else (so that the RE can change sshd_config if they want to)
  augeas { "sshd_config":
    changes => [
    "set /files/etc/ssh/sshd_config/PermitRootLogin no",
    ],
  }
}

En el caso de que haya comentarios:
#PermitRootLogin yes
Lo convierte a
PermitRootLogin no


Para coger valores:
¿¿??


Ejemplo:
  augeas { "mysqld_multi":
    context => "/files/etc/mysql/my.cnf",
    changes => [
        "set target[ . = 'mysqld_multi'] mysqld_multi",
        "set target[ . = 'mysqld_multi']/mysqld /usr/bin/mysqld_safe",
        "set target[ . = 'mysqld_multi']/mysqladmin /usr/bin/mysqladmin",
        "set target[ . = 'mysqld_multi']/log /var/log/mysql/mysqld_multi.log",
        "set target[ . = 'mysqld_multi']/user multi_admin",
        "set target[ . = 'mysqld_multi']/password ${mysql::multi_password}",
      ],
    require => [File['/etc/mysql/my.cnf'],File['/usr/sbin/mysqld_create_multi_instance'],File['/etc/init.d/mysql']],
  }
