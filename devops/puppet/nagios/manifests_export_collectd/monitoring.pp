@@nagios_host {$::hostname:
  ensure => present,
  address => $::ipaddress,
  use => 'dsmc',
  tag => "tidcampus",
  mode => 0644,
}

# Cada elemento de puppet tiene que tener un nombre unico
# Si dos hosts crean un "@@nagios_service { 'cpu': }" fallaria, porque luego el servidor de icinga tendria dos recursos con el mismo nombre
@@nagios_service { "${::hostname}-cpu":
  ensure => present,
  check_command => "check_nrpe!comando",
  service_description => "cpu",
  host_name => $::hostname,
  tag => "tidcampus",
  use => 'dsmc',
  mode => 0644,
}

package{'nrpe':
        ensure => present,
}
->
file { '/etc/nrpe.d/comando.cfg':
    ensure => file,
    content => 'command[comando]=/usr/lib64/nagios/plugins/check_tcp -H 127.0.0.1 -p 80',
}
->
package {'nagios-plugins-tcp':
               ensure => present,
}

