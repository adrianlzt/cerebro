De forma casera:

Solo añade el repo si el fichero .list no existe
exec { 'add-collectd-repo' :
  command => "add-apt-repository -y ppa:vbulax/collectd5",
  unless => 'test -f /etc/apt/sources.list.d/vbulax-collectd5-precise.list',
}

Solo actualiza los repos si tienen más de un dia de antiguedad
exec { 'update_repos' : 
  command => "apt-get update",
  onlyif => 'test $(( $(date +%s) - $(stat -c %Z /var/cache/apt/pkgcache.bin) )) -gt $(( 24 * 60 * 60 ))',
}



https://forge.puppetlabs.com/puppetlabs/apt

Para trabajar con apt-get usar este paquete.
Permite definir que 
  los paquetes siempre estén actualiados
  forzar una determinada versión
  instalar ppas
  instalar keys
  ...

Add app:
class { 'apt': }   <-- Siempre hay que declarar primero la clase apt
apt::ppa { 'ppa:drizzle-developers/ppa': }


Para Ubuntu Quantal:

  apt::key { '1C4CBDCDCD2EFD2A':
    ensure => present,
  }

  apt::source { 'percona':
    ensure      => present,
    include_src => true,
    location    => 'http://repo.percona.com/apt',
    release     => $::lsbdistcodename,
    repos       => 'main',
    notify      => Exec['percona::repo::apt-get update'],
    require     => Apt::Key['1C4CBDCDCD2EFD2A'],
  }

