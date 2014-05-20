http://docs.puppetlabs.com/guides/custom_types.html

Crear nuevos types.

Ejemplo: https://github.com/masterzen/puppet-dns/blob/master/lib/puppet/type/dnszone.rb


Los tipos de puppet (File, Exec, etc) se encuentran en lib/puppet/type/

Todos empiezan con "Puppet::Type.newtype(:file) do" y luego definen en ruby que es lo que van a hacer.

Pueden llamar a otras librerias.
Por ejemplo los nagios_* hacen uso de lib/puppet/util/nagios_maker.rb

Se pueden usar otros tipos definidos, ejemplo de nagios_maker.rb
 25         Puppet::Type.type(:file).new(props)
