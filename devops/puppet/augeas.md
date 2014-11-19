http://augeas.net/
https://docs.puppetlabs.com/references/latest/type.html#augeas

# Instalacion Ubuntu
Herramientas de consola:
sudo apt-get install augeas-tools

Lenses: son los ficheros que determinan como se parsea un determinado fichero
/usr/share/augeas/lenses/

Arrancar augtool:
augtool> get /files/et<tab>
y ver que nos deja hacer.

Los ficheros que puede modificar vienen definidos por el "filter" de cada "lens".
Si el fichero no esta en su ubicacion por defecto... creo que no se puede hacer nada.



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
