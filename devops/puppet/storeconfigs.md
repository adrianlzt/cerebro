No hace falta instalar puppetdb para tener storeconfigs (parte necesaria para los exported resources).
Vale con instalar (notas de Xavi Carrillo)
rubygem-activerecord
rubygem-sqlite3-ruby
puppet.conf
  storeconfigs = true
chown puppet:puppet /var/lib/puppet/state/  -R

En puppetdb.md está como instalar puppetdb con un módulo de puppet y configurar el storeconfigs
