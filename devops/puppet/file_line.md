http://puppetlabs.com/blog/module-of-the-week-puppetlabsstdlib-puppet-labs-standard-library

En el módulo stdlib tenemos la función file_line que nos permite asegurar que tal linea existirá en un fichero

file_line { 'puppet master host entry':
  ensure => present,
  line   => '172.16.240.200  master.dev.puppetlabs.com	 master',
  path   => '/etc/hosts',
}

Este ejemplo nos asegura tener esa línea siempre en /etc/hosts

Con 
  ensure => absent
y
  ensure => present

Podemos asegurar que la línea estará borrada o presente.
