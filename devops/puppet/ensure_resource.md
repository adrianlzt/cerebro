ensure_resource(file, $target, {
  ensure => present,
  owner => $monitorizacion::params::user,
  require => Nagios_hostgroup[$servicename],
})

mirar stdlib.md


If the resource already exists but does not match the specified parameters, this function will attempt to recreate the resource leading to a duplicate resource definition error.
