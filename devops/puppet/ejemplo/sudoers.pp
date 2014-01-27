# Se ocupa de mantener siempre el fichero sudoers como el definido en local /etc/puppet/files
file { '/etc/sudoers':
        ensure => 'file',
        mode => '0440',
        owner => 'root',
        group => 'root',
        source => '/etc/puppet/files/sudoers',
}
