En este fichero se cargan las opciones por defecto.

Si por ejemplo queremos definir un owner por defecto pondríamos:
File {
  owner	=> 'root',
}


Tambien podemos utilizarlo para definir en cada nodo que clases se van a ejecutar y con que parámetros

El nombre del node tiene que estar en minúsculas

node default {
    include sudo
    class { 'clase':
      param1 => "valor",
    }
}


IMPORTANTE: reiniciar el puppet master tras hacer cambios en este fichero
