En este fichero se cargan las opciones por defecto.

Si por ejemplo queremos definir un owner por defecto pondríamos:
File {
  owner	=> 'root',
}


Tambien podemos utilizarlo para definir en cada nodo que clases se van a ejecutar y con que parámetros
import "nodes/*.pp"

El nombre del node tiene que estar en minúsculas

En el caso de no "matchear" ningún "node" usará el default.
node default {
    include sudo
    class { 'clase':
      param1 => "valor",
    }
}

En el site.pp podemos poner un include common (por ejemplo) para que se aplique a todos los nodos.

También podemos que en cada definición de nodo heredar el default (por ejemplo) para que coga las configuraciones de este.
node blabla inherits default { ... }


IMPORTANTE: reiniciar el puppet master tras hacer cambios en este fichero
