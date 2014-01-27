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
