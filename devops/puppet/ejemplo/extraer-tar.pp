exec { '/bin/tar zxvf fichero.tar.gz':
        cwd => '/tmp',
        creates => '/tmp/mifichero',
}
