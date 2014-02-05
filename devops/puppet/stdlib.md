https://forge.puppetlabs.com/puppetlabs/stdlib

Funciones para trabajar con strings, arrays, etc.

join(["uno","dos","tres"],",") => "uno,dos,tres"

$var = join(["uno","dos","tres"],"','")
notify {"llena: '$var'":} => "llena: 'uno','dos','tres'"


parsejson($var) (mirar json.md)

empty
Returns true if the variable is empty.

Para los validate_ mirar validate.md

is_array
is_domain_name
is_float
is_function_available
  This function accepts a string as an argument, determines whether the Puppet runtime has access to a function by that name. It returns a true if the function exists, false if not.
is_hash
is_integer
is_ip_address
is_mac_address
is_numeric
is_string


ensure_packages
Takes a list of packages and only installs them if they don't already exist.



Define un recurso si no está definido ya:
user { 'dan':
  ensure => present,
}
if ! defined_with_params(User[dan], {'ensure' => 'present' }) {
  user { 'dan': ensure => present, }
}


Más compacto:
This example only creates the resource if it does not already exist:
ensure_resource('user', 'dan', {'ensure' => 'present' })

Ejemplo más extenso:
ensure_resource(file, $target, {
  ensure => present,
  owner => $monitorizacion::params::user,
  require => Nagios_hostgroup[$servicename],
})


El truco para no tener exported resources duplicados es crearnos una clase propia que será la que exportemos.
Dentro de esa clase definimos el recurso que necesitamos con ensure_resource().
De esta manera, dos nodos pueden declarar el mismo exported resource (aunque tienen que tener distinto nombre, el $fqdn por ejemplo), y el host que recoje esos exported resources, usará ensure_resources para evitar duplicidades.
Idea sacada de: http://ttboj.wordpress.com/2013/06/04/collecting-duplicate-resources-in-puppet/


El parámetro alias parece que tiene algun significado especial, porque al definir una defined type con nombre distinto pero igual alias me dice:
Error: Failed to apply catalog: Parameter alias failed on Monitorizacion::Icinga::Hostgroup[m2m-client.com]: Munging failed for value "m2m generic group" in class alias: Cannot alias Monitorizacion::Icinga::Hostgroup[m2m-client.com] to "m2m generic group"; resource ["Monitorizacion::Icinga::Hostgroup", "m2m generic group"] already declared

