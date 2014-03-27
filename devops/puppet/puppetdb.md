http://docs.puppetlabs.com/puppetdb/1/configure.html#host

Mirar storeconfigs.md


Apagar iptables.
Con puppet: puppet module install puppetlabs/puppetdb
En /etc/puppet/manifests/nodes.pp (configurando el nodo master):
node 'puppet' {
  class { 'puppetdb': }
  class { 'puppetdb::master::config': }
}

# puppet agent --test  (para forzar la aplicación de estos recursos)

Puede que falle, porque el servidor que tiene que escuchar en el puerto 8081 tarde más de lo esperado en arrancar.
Simplemente ejecutamos de nuevo el agente.


Otra forma:
http://docs.puppetlabs.com/guides/puppetlabs_package_repositories.html#open-source-repositories

Instalación en Ubuntu (mas paquetes en http://apt.puppetlabs.com/):
Suponiendo que instalamos el puppetdb en el mismo servidor que el master.
$ wget http://apt.puppetlabs.com/puppetlabs-release-precise.deb
$ sudo dpkg -i puppetlabs-release-precise.deb
$ sudo apt-get update

# apt-get install puppetdb puppetdb-terminus

# puppet module install puppetlabs-puppetdb



En la base de datos (por defecto mete PostgreSQL) podemos ver los exported resources en la base de datos puppetdb con:
select * from catalog_resources where exported='t';


Para "purgar" los exported resources de un nodo (borrar el nodo)
puppet node deactivate <nodename>
Pero también hace falta configurar el purge en el nodo que importa los recursos.
Para el caso de nagios:
resources { ['nagios_service', 'nagios_host']:
  purge  => true,
  notify => Service['nagios'],
}
No me funciona :/
https://ask.puppetlabs.com/question/88/how-can-i-purge-exported-resources-from-puppetdb/
http://projects.puppetlabs.com/issues/17680
http://projects.puppetlabs.com/issues/14721


## Sacado de http://www.allgoodbits.org/articles/view/32 ##

Configure the puppet server to use PuppetDB


Create /etc/puppet/puppetdb.conf:
[main]
server = puppetdb.example.com
port = 8081



Edit the puppet server's /etc/puppet/puppet.conf:
[master]
  storeconfigs = true
  storeconfigs_backend = puppetdb


Create, if necessary, /etc/puppet/routes.yaml:
---
master:
  facts:
    terminus: puppetdb
    cache: yaml
