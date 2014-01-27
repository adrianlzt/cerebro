Nos permiten modificar las variables definidas en esa clase

Si no le damos valor por defecto, hay que pasarle el parametro obligatoriamente.
class motd(
  $hola,
  $var = 'mundo',
  $otra = undef,
)
{
  file {'/etc/motd':
    ensure => present,
    content => template('motd/motd.erb'),
  }
}


# Ahora podemos llamar a la clase como si fuese un recurso:
class { 'motd': 
  hola => "pepe",
  var => 'GRILLO'
}


Para ejecutarlas localmente:
puppet apply -e "class {'nombre': }"


Podemos hacerun chequeo de los parámetros con los métodos 'validate_' de stdlib: http://forge.puppetlabs.com/puppetlabs/stdlib
