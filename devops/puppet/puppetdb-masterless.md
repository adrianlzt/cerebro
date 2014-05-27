http://docs.puppetlabs.com/puppetdb/latest/connect_puppet_apply.html
Connecting Standalone Puppet Nodes to PuppetDB

yum update puppetdb
  Es necesario la versión 2.0

/etc/puppetdb/conf.d/jetty.ini
Comentar:
  ssl-host
  ssl-port
  ssl-key
  ssl-cert

En el puppetdb configurar un nginx que escuche SSL en 8081 y redireccione a localhost:80
http://docs.puppetlabs.com/puppetdb/latest/connect_puppet_apply.html#option-a-set-up-an-ssl-proxy-for-puppetdb

yum install nginx
web/nginx/proxy_ssl.md

Usar los mismos certificados de puppet para nginx
cp /etc/puppet/ssl/certs/hostname.pem /etc/nginx/cert.pem
cp /etc/puppet/ssl/private_keys/hostname.pem /etc/nginx/cert.key



En los clientes:
yum install -y puppetdb-terminus hiera

/etc/puppetdb.conf
[main]
server = puppet
port   = 8081
soft_write_failure = true

/etc/puppet/puppet.conf
[main]
server = false
storeconfigs = true
storeconfigs_backend = puppetdb
hiera_config = $confdir/hiera.yaml

/etc/puppet/routes.yaml
---
apply:
  catalog:
    terminus: compiler
    cache: puppetdb
  facts:
    terminus: facter
    cache: puppetdb_apply

He quitado la sección resource de routes.yaml ya que me da problemas a la hora de recolectar defined types
Solo sería necesario en los nodos que vayan a hacer este tipo de recoleción (Mitipo::Definido <<| |>> {})
  resource:
    terminus: ral
    cache: puppetdb
