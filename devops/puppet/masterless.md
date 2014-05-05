http://www.slideshare.net/PuppetLabs/bashton-masterless-puppet

http://semicomplete.com/presentations/puppet-at-loggly/puppet-at-loggly.pdf.html

PuppetDB sin master: http://docs.puppetlabs.com/puppetdb/latest/connect_puppet_apply.html



Configuración en los clientes:
yum install puppetdb-terminus

vi /etc/puppet/puppetdb.conf
[main]
server = puppetdb.server.com
port   = 8081
soft_write_failure = true

vi /etc/puppet/puppet.conf
[main]
server = false
storeconfigs = true
storeconfigs_backend = puppetdb
hiera_config=$confdir/hiera.yaml # si vamos a querer usar hiera

vi /etc/puppet/routes.yaml
---
apply:
  catalog:
    terminus: compiler
    cache: puppetdb
  resource:
    terminus: ral
    cache: puppetdb
  facts:
    terminus: facter
    cache: puppetdb_apply

Ahora tendremos que tener:
/etc/puppet/manifests/site.pp
/etc/puppet/modules/

Si queremos usar hiera deberemos crear
/etc/puppet/hiera.yaml
Y los ficheros .yaml, .json o el backend que hayamos elegido.
