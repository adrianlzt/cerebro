http://docs.puppetlabs.com/puppetdb/latest/connect_puppet_apply.html

Connecting Standalone Puppet Nodes to PuppetDB

En el puppetdb configurar un nginx que escuche SSL en 8081 y redireccione a localhost:80
http://docs.puppetlabs.com/puppetdb/latest/connect_puppet_apply.html#option-a-set-up-an-ssl-proxy-for-puppetdb

/etc/puppetdb/conf.d/jetty.ini
Comentar:
  ssl-host
  ssl-port
  ssl-key
  ssl-cert

yum install nginx
web/nginx/proxy_ssl.md

yum update puppetdb
  Es necesario la versión 2.0

