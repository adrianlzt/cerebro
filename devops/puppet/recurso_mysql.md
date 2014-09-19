Módulo puppetlabs-mysql

Instalar cliente:
class { 'mysql': }

Instalar servidor
class { 'mysql::server':
  config_hash => { 'root_password' => 'foo' }
}

Instalar base de datos con usuario ,permisos y schema:
    mysql::db { 'mydb':
      user     => 'myuser',
      password => 'mypass',
      host     => 'localhost',
      grant    => ['all'],
      sql      => '/path/fichero.sql',
    }


Crear usuario y darle permisos:
  mysql_user { 'icinga@%':
    ensure                   => 'present',
    password_hash            => mysql_password(hiera('mysql_icinga_passwd','icinga')),
    max_queries_per_hour     => '0',
    max_updates_per_hour     => '0',
  }

  # importante, el nombre del recurso debe tener este esquema
  mysql_grant { 'icinga@%/icinga.*':
    ensure     => 'present',
    options    => ['GRANT'],
    privileges => ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE VIEW', 'INDEX', 'EXECUTE'],
    table      => 'icinga.*',
    user       => 'icinga@%',
  } 
  
  # Database schema for icinga-idoutils-libdbi-mysql-1.10.3
  exec{ "icinga-import":
    command     => "/usr/bin/mysql icinga < /usr/share/doc/icinga-idoutils-libdbi-mysql-1.10.3/db/mysql/mysql.sql",
    logoutput   => true,
    refreshonly => true,
    require     => Mysql_grant['icinga@%/icinga.*'],
    subscribe   => Mysql_database['icinga'],
  }

