ensure_resource(file, $target, {
  ensure => present,
  owner => $monitorizacion::params::user,
  require => Nagios_hostgroup[$servicename],
})

mirar stdlib.md
