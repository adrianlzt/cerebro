file { '/etc/puppet/hiera':
  ensure => 'directory',
  owner => 'root',
  group => 'root',
}

No se puede hacer algo similar a mkdir -p. El workaround es:
  file { [ '/etc/facter', '/etc/facter/facts.d' ]:
    ensure => 'directory',
    owner => 'root',
    group => 'root',
  }

Dar permisos a un directorio y sus hijos.
file { '/opt/pepe' :
  owner => 'root',
  group => 'root',
  recurse => true,
}

Nos aseguramos que solo haya ficheros puppetizados en ese directorio
Ficheros creados a mano serán borrados. Recursos 'file' en /tmp/puppet serán conservados
file { '/tmp/puppet':
  ensure => directory,
  recurse => true,
  purge => true,
}

