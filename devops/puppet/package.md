package { 'servidorssh':
  name => $::osfamily ? {
    'Debian' => 'ssh',
    'RedHat' => 'openssh',
    default => fail("Module '${module_name}' is not currently supported on ${::operatingsystem}")
  },
  ensure => present,
}


package { 'apache':
  ensure => '2.2-3.el6.bla.bla',
}

ensure => 'latest'

Para instalar un rpm local
source => 'puppet:///modules/hiera/hiera-1.3.1-0.1rc1.33.noarch.rpm',


package {
  "build-essential": ensure => latest;
  "python": ensure => "2.6.6-2ubuntu1";
  "python-dev": ensure => "2.6.6-2ubuntu1";
  "python-setuptools": ensure => installed;
}

Para instalar una gema
package { "rake":
  provider => 'gem',
}

Para instalar un paquete pip
package { "django":
  provider => 'pip',
}


Instalar rpm (meter el rpm en el files/ del module):
  $package = "NOMBRE-1.0.4-1.x86_64.rpm"

  file { "/tmp/${package}":
    source => "puppet:///modules/${module_name}/${package}",
    owner => 'root',
    group => 'root',
    mode => '0644',
  }
  ->
  package { 'NOMBRE':
    ensure => installed,
    provider => rpm,
    source => "file:///tmp/${package}",
    require => File["/tmp/${package}"],
  }



## Absent en redhat family ##
Si marcamos un paquete como absent en redhat intentará borrarlo con "rpm -e"
Si ese paquete tiene alguna dependencia, dará un error y no se borrará.
La opción --noop no nos avisará de este problema.

Para forzar el borrado recursivo:
ensure => purged

