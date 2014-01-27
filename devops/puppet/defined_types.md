http://docs.puppetlabs.com/learning/definedtypes.html

define monitorizacion::deftypetest (
  $nombre = "nombre",
  $apellido = "apellido"
) 
{
  # Tambien existe una variable $title (o $name, es lo mismo) con el nombre del defined type
  file { '/tmp/puppet.$nombre':
    content => $apellido
  } 
} 


Uso:
monitorizacion::deftypetest {'nombre':
  $nombre => "hola",
  $apellido => "pepe",
}


Si en un defined type definimos un package, al reutilizarlo nos protestará diciendo que el recurso está duplicado (Duplicate definition).
El truco es crear una clase común para el defined type, y allí definir las cosas (escrito de memoria, puede tener algún fallo):

class paquete::cosa_class {
  package { 'paquete' : ensure => present }
}

define paquete::cosa {
  include paquete::cosa_clase
  file { '/bla/ble' : content => "testtest" }
}
