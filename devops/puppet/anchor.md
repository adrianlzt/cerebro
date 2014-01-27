Poner "anclas" para poder usarlas para hacer requires y before sobre un elemento que no haga nada

Ejemplo:
        anchor { 'graphitepkg::begin': }
        anchor { 'graphitepkg::end': }

        package { $::graphite::params::graphitepkgs :
                        ensure  => installed,
                        require => Anchor['graphitepkg::begin'],
                        before  => Anchor['graphitepkg::end']
        }

