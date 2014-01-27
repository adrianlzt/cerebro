class motd {
        file {'/etc/motd':
                ensure => present,
                content => template('motd/motd.erb'), #Sabe que tiene que ir al directorio files del modulo motd
        }
}


Para incluir clases:
include motd

Para tener como dependencia otra clase:
  The require function acts like include, but also causes the class to become a dependency of the surrounding container
require clase

Lo bueno de los includes es que podemos poner varias veces lo mismo y funcionará correctamente.
La declaración de clases es más extricta, y si declaramos dos veces la misma fallará.
Además que con include no podemos usar clases parametrizadas.

Mejor manera es usar instanciación: class {'motd': }
