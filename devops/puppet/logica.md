SELECTOR:
Caso en el que un paquete se llame distintos en distintos OS
package { 'servidorssh':
	name => $::osfamily ? {
		'Debian' => 'ssh',
		'RedHat' => 'openssh',
		default => fail("Module '${module_name}' is not currently supported on ${::operatingsystem}")
	},
	ensure => present,
}

file { "$icinga_root_dir/icinga.cfg":
  content => template("${module_name}/icinga.cfg.erb"),
  owner => $monitorizacion::params::user,
  group => $nagiosql ? {
           true => $monitorizacion::params::apache_group,
           false => $monitorizacion::params::group
  },
  ...
}


CASE:
case $::osfamily {
	'debian': {
		$sshd::package = 'ssh',
		$sshd::cfgpath = '/etc/ssh'
	}
	'redhat': {
		...
	}
}

class mirrors {
  case $::osfamily {
    'redhat': {
      class { 'mirrors::yum': }
    }
    'debian': {
      class { 'mirrors::apt': }
    }
    default: {
      fail("Module '${module_name}' is not currently supported by Puppet Sandbox on ${::operatingsystem}")
    }
  }
}




IF:
http://docs.puppetlabs.com/puppet/2.7/reference/lang_conditional.html#if-statements

Ej. si es una maquina virtual vmware, instalar el vmware-tools
if $::virtual == 'vmware' {
	package{'vmware-tools': } #El ensure por defecto es present, por lo que instalaria el paquete
}

if $osfamily == 'debian' and $ensure != 'latest' {
  class { 'puppet::apt_pin':
    version => $ensure
  }
}

Tambien soporta expresiones regulares:
if $::virtual =~ /vm.*/ { ...


$is_virtual = true
#$is_virtual = false

if $is_virtual {
      service {'ntpd':
        ensure => stopped,
        enable => false,
      }
} else {
      service { 'ntpd':
        name       => 'ntpd',
        ensure     => running,
        enable     => true,
        hasrestart => true,
        require => Package['ntp'],
      }
}

Tambien se puede usar elsif


Forma rápida de asignar una variable sin poner if:
$config_file_mode = $::operatingsystem ? {
  /(?i:RedHat|Scientific|Centos)/ => '0664',
  default                         => '0644',
}


if $is_virtual {
      # Our NTP module is not supported on virtual machines:
      warn( 'Tried to include class ntp on virtual machine; this node may be misclassified.' )
}
elsif $operatingsystem == 'Darwin' {
      warn ( 'This NTP module does not yet work on our Mac laptops.' )
}
else {
      # Normal node, include the class.
      include ntp
}


Negacion:
if !$is_virtual {
  fail("Debe ser virtual")
}


Variables vacías o undef:
$var = ''
if empty($var) {
  fail('Variable $var vacia') # Si la variable $var no está definida, o definida a 'undef' saltaría también el fail
}

Variables con undef:
if !$varnoexiste {
  fail('Variable no definida')
}

if $prefix == "tre-" and $var == "grupo,boyes" {
notify {$noarray:}
} else {
notify {'mied':}
}

if $var or $var2 {...}
