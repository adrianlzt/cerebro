Si las variables van solas no se ponen comillas.
Si van dentro de un literal ("cosa ${var} mas") se pone con corchetes.
Las variables no pueden tener guiones (-), si pueden tener guiones bajos (_).
Nomenclatura: $, luego ponemos el nombre de la clase y por último el nombre de la variable.

true,false

Ejemplo:

$longthing = "Imagine I have something really long in here. Like an SSH key, let's say."
file {'authorized_keys':
  path    => '/root/.ssh/authorized_keys',
  content => $longthing,
}

Otro ejemplo:

class sshd {
	$sshd::package = 'sshd'

	package { $sshd::package:
		name => ...


Variables del facter, se ateceden con $::
Ej.:
file { "/etc/ssh/sshd_config":
	source => "puppet:///modules/sshd/sshd_config.${::hostname}",
	...


Tambien se pueden definir arrays:
$clase::package = ['package1','package2']

package { $clase::package:
	ensure => present,
}
De esta manera se instalarían los dos paquetes.

Ejemplo de uso, instalar un montón de dependencias php.


Tambien se puede hacer.
	notify => Service['ssh','ftpd']


$var = $::osfamily ? {
         'Debian' => 'libapache2-mod-passenger',
         'RedHat' => 'rubygem1.9.3-passenger',
       }

