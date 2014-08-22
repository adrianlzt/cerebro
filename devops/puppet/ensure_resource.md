ensure_resource(file, $target, {
  ensure => present,
  owner => $monitorizacion::params::user,
  require => Nagios_hostgroup[$servicename],
})

mirar stdlib.md


If the resource already exists but does not match the specified parameters, this function will attempt to recreate the resource leading to a duplicate resource definition error.

Haciendo query a puppetdb podemos ver los parametros que se pasan:
curl -X GET 'http://localhost:8080/v2/resources/Monitorizacion::Icinga::Host_template'
