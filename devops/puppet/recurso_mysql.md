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
    database_user { 'bob@localhost':
      password_hash => mysql_password('foo')
    }

    database_grant { 'user@localhost/database':
      privileges => ['all'] ,
      # Or specify individual privileges with columns from the mysql.db table:
      # privileges => ['Select_priv', 'Insert_priv', 'Update_priv', 'Delete_priv']
    }

