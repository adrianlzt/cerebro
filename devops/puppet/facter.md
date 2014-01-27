# facter

Saca las variables de entorno del sistema

Podemos usar estas variables globales para crear condiciones.
Ejemplo, solo instalar las vmware-tools en las maquinas que sean virtuales sobre vmware (virtual => vmware)


Se pueden preguntar por una variable directamente. Ej.:
facter osfamily
facter operatingsystem


Para meter las variables de facter en los manifest:
$::nombre


Crear los nuestros propios (external facts, facter >= 1.7)
/etc/facter/facts.d
mifact.yaml:
	mifact1: mivalor1

En JSON (mejor, YAML puede quedar deprecated)
mifact.json
{
  "proyecto": "tugo"
}



El fqdn es una unión del hostname y el domainname
/usr/lib/ruby/site_ruby/1.8/facter/fqdn.rb

El 'facter domain' lo saca de domain.rb
# Resolution:
#   On UNIX (excluding Darwin), first try and use the hostname fact, which uses the hostname system command, and then parse the output of that.
#   Failing that it tries the dnsdomainname system command.
#   Failing that it uses /etc/resolv.conf and takes the domain from that, or as a final resort, the search from that.
#   Otherwise returns nil.

