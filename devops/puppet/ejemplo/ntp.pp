# Ejemplo de la "trinidad".
# Instalamos paquete
# Lo configuramos
# Arrancamos el servicio


package { 'ntp':
        ensure => installed,
}

file { '/etc/ntp.conf':
        source => '/home/vagrant/curso/ntp/ntp.conf.erb',
        require => Package['ntp'], #necesitamos que este recurso se ejecute antes
        owner => 'root',
        group => 'root',
        mode => '0644',
        # backup => main, #hace falta definir un bucket remoto o local
        backup => '.bak', #mantiene el fichero que existia con la extension .bak
        notify => Service['ntp'], #si el recurso restaura el fichero, reiniciamos el servicio
}

service { 'ntp':
        enable => true, #marcando para iniciar en el arranque de la maquina
        ensure => running, #marcado para que este arrancando cuando la maquina este iniciada
        require => File['/etc/ntp.conf'],
        # require => [ Package['ntp'],File['/etc/ntp.conf'] ] #Se pueden definir varias dependencias
}

