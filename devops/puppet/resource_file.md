Cuidado con tener muchos files, porque el server tendrá que procesar un md5 por cada fichero en cada puppet run.

Lo más básico:
file { "/tmp/test":
  content => "prueba\nblabla",
}

file { "/tmp/test":
  source => "puppet:///modules/${module_name}/NOMBREFICHERO",
  owner => 'root',
  group => 'root',
  mode => '0644',
}

file { '/etc/ntp.conf':
        source => '/home/vagrant/curso/ntp/ntp.conf.erb',
        owner => 'root',
        group => 'root',
        mode => '0644',
        backup => puppet, #hace falta definir un bucket remoto o local
        # backup => '.bak', #mantiene el fichero que existia con la extension .bak
	notify => Service['ntpd'],
        require => Package['ntp'], #necesitamos que este recurso se ejecute antes
}

# El bucket puppet existe por defecto, y almacena en /var/lib/puppet/clientbucket

Si queremos crear nuestro propio bucket.

Remoto:
filebucket { main:
  server => puppet,
  path   => false,
  # The path => false line works around a known issue with the filebucket type.
}

Local:
filebucket { main:
  path   => '/dir/blabla/dir',
}

Enlace:
file { '/tmp/link-to-motd':
  ensure => 'link',
  target => '/etc/motd',
}

Cambiar directorio existente por enlace a otro directorio
file { '/etc/puppet/modules':
  ensure => 'link',
  force => true,
  target => '/vagrant/modules',
}



Si queremos usar un fichero que tenemos en el directorio files/ del modulo
source => 'puppet:///modules/NOMBREMODULO/NOMBREFICHERO'


Si el fichero al que apuntamos es un enlace, debemos forzarle a que lo borre.

Si queremos meter un template:
content => template('motd/motd.erb')


## Valores por defecto ##
Si vamos a definir un monton de files{} que compartan muchos valores, podemos dar unos valores genericos.

File {
  owner	=> 'root',
  mode	=> '0644',
}

file {'/bla/a':
  source	=> ...
}

file {'/bla/bla':
  source 	=> ...
  ...
}


Borrar fichero:
file { '/etc/blabla' :
  ensure => absent
}


Cambiar permisos a un fichero FIFO
  exec { 'fix-group-icinga.cmd':
    path => "/bin:/usr/bin",
    command => 'chgrp www-data /var/lib/icinga/rw/icinga.cmd',
    onlyif => '/usr/bin/test `stat -c "%G" /var/lib/icinga/rw/icinga.cmd` != www-data',
  }

