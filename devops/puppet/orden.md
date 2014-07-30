# http://docs.puppetlabs.com/references/latest/metaparameter.html

En principio en Puppet no existe orden a la hora de ejecutar los manifest.

Pero esto tiene problemas, necesitamos tener el paquete instalado antes de configurarlo; y configurarlo antes de arrancarlo.

Los metaparámetros es lo que utilizaremos para definir un orden a los modulos/manifest, hacen referencia a otro recurso, determinado como Tipo['nombre'].

require: es necesario que este recurso este disponible antes de ejecutar el que estamos definiendo.

file { "/usr/local/scripts/myscript":
  source  => "puppet://server/module/myscript",
  mode    => 755,
  require => File["/usr/local/scripts"]
}

No probado, pero creo que vale
require => [File["blabla],Service["pepep"]]


before (para no liar, usar unicamente require): se asegura que este recurso se ejecute antes del otro que referenciamos (es lo mismo que require, solo que la orden se pone en uno de los recursos o en el otro)

file { "/var/nagios/configuration":
  source  => "...",
  recurse => true,
  before  => Exec["nagios-rebuid"]
}

Mas sencillo:
Package['cosa'] -> File['configuracion'] -> Service['elserv']


notify: ejemplo, tras modificar un fichero de configuración, que se reinicie el servicio. Este metaparámetro es el que se ejecutará los recursos que tengan el refreshonly a true.
Este notify hace un restart al sshd

file { "/etc/sshd_config":
  source => "....",
  notify => Service['sshd']
}

service { 'sshd':
  ensure => running
}

subscribe (para no liar, mejor usar solo notify): al igual que notify pero en el otro sentido.

class nagios {
  file { 'nagconf':
    path   => "/etc/nagios/nagios.conf"
    source => "puppet://server/module/nagios.conf",
  }
  service { 'nagios':
    ensure    => running,
    subscribe => File['nagconf']
  }
}


http://docs.puppetlabs.com/puppet/3/reference/lang_run_stages.html
Stage (menos importante):
La stage main viene por defecto, las otras deberemos crearlas.
Para crear "clases", ordenadas entre si, y asociar a esas clases unos recursos.
Stage['pre'] -> Stage['main'] -> Stage['post']
class { 'foo': stage => 'pre' }
stage { 'pre': }
stage { 'post': }

Hace falta definirlas primero
stage { [ pre, post ]: }


file {'/tmp/test1':
  ensure  => present,
  content => "Hi.",
}
->
notify {'after':
  message => '/tmp/test1 has already been synced.',
}
