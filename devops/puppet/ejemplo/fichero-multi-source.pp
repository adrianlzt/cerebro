# Para pillar ficheros del master
file { '/etc/nfs.conf':
  source => [
    'puppet:///modules/nfs/conf.$host',
    'puppet:///modules/nfs/conf.$operatingsystem',
    'puppet:///modules/nfs/conf'
  ]
}
# En este ejemplo pillaría el fichero conf.$host del master, si no existe, el conf.centos, si no existe, el conf
