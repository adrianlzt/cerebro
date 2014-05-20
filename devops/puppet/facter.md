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
Mirar fqdn.md



## Agregar variables al facter desde un módulo ##
https://github.com/pdxcat/puppet-module-collectd/blob/master/lib/facter/collectd_version.rb
http://www.masterzen.fr/2011/10/29/puppet-extension-points-part-1/ "Want some facts?"
