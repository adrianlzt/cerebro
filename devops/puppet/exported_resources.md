Ideas del curso TID:
Información centralizada de los nodos que están puppetizados.
Los nodos pueden obtener información del resto de los nodos.
Puede servir para configurar nagios.

Acordarse de que el master tiene que tener configurado puppetdb


CUIDADO: los exported resources son "eternos". Se recomienda meterles un 'tag' para poder distinguirlos.
Cuando un recurso desaparece tenemos que ejecutar el comando puppet deactiva.


http://docs.puppetlabs.com/puppet/latest/reference/lang_exported.html
http://docs.puppetlabs.com/guides/exported_resources.html
Se utiliza para que un host pueda configurar otro host.
For instance, a host could configure its services using Puppet, and then could export Nagios configurations to monitor those services.

Para hacer un recurso exportado: @@nombre
Para utilizar un recurso exportado: <<| |>>


Hace falta tener PuppetDB (storeconfigs parece que esta deprecated)


Ejemplo:

node 'client1' {
  @@file { "/tmp/foo":
    content     => "fjksfjks\n",
    tag         => "foofile",
  }
}
El nodo client1 exporta el recurso fichero (este cliente NO tendrá ese fichero instalado)

node 'client2' {
  class { 'motd': }
  File <<| tag == 'foofile' |>>
}
El nodo client2 cogerá ese recurso exportado y lo instalará en su máquina.
El 'tag' en este caso solo sirve para especificar que fichero se esta importando.



Otro ejemplo:
Queremos instalar un servicio que necesita de un usuario en una base de datos mysql. Esta base de datos mysql está en una máquina separada.
Lo que haremos será crear un export resource del usuario mysql, y en la base de datos coger todos los exported resources de usuarios de mysql.

En la maquina donde se instala el servicio:
class servicio{
  package {'blabla': }
  file {'/etc/servicio/servicio.conf': content => 'puppet:///modules/servicio/servicio.conf',}
  service {'servicio': ensure => running, enable => true,}
  @@database_user { 'bob@10.34.56.201':
      password_hash => mysql_password('foo')
  }
}

En la máquina donde corre la base de datos:
node 'dbnode' {
  ...
  Database_user <<| |>>
}


Si queremos usar un exported resource de un defined type (o defined resource, que es lo mismo), tenemos que poner las dos con mayúsculas:
Mysql::Db <<| |>>


Al recoger los exported resources puede ser normal tener que notificar a algún servicio
File <<| tag == nagios_host |>> {
  notify => Service[$nagios::params::service],
}


Ahora veo si puede pillar un fichero .sql y usarlo como schema.
Problema, el comando de crear la base de datos mete el valor que le pasemos en 'sql'. No acepta un puppet:///
Dos soluciones:
  -crear el fichero en /tmp y luego importarlo en la base de datos
    funciona localmente, aunque falla la importacion, dice que el usuario root no tiene permisos :?
  -que la variable lea el contenido del fichero


En la base de datos (por defecto mete PostgreSQL) podemos ver los exported resources en la base de datos puppetdb con:
select * from catalog_resources where exported='t';



## BORRAR EXPORTED RESOURCES
Una vez un nodo ha metido un exported resource en la puppetdb, este no se borrará (pero puede que permanezca en un catalog que no se volverá a usar).
Para forzar el borrado haremos: 
  puppet node clean nombre-del-nodo
    Borra el certificado, asi otra máquina distinta con el mismo hostname puede volver a registrarse en puppet
    Clean up everything a puppet master knows about a node, including certificates and storeconfigs data.
  puppet node deactivate client
    Quita los exported resources (seguirán apareciendo en PuppetDB, pero con un catalog que no se aplicará)
    This will ensure that any resources exported by that node will stop appearing in the catalogs served to the remaining agent nodes.
    http://docs.puppetlabs.com/puppetdb/latest/maintain_and_tune.html#deactivate-decommissioned-nodes

PuppetDB can automatically deactivate nodes that haven’t checked in recently. To enable this, set the node-ttl setting.
  node-ttl: Auto-deactivate nodes that haven’t seen any activity (no new catalogs, facts, etc) in the specified amount of time
  node-purge-ttl: Automatically delete nodes that have been deactivated for the specified amount of time

Note: Deactivating a node does not remove (e.g. ensure => absent) exported resources from other systems; it only stops managing those resources. If you want to actively destroy resources from deactivated nodes, you will probably need to purge that resource type using the resources metatype. Note that some types cannot be purged (e.g. ssh authorized keys), and several others usually should not be purged (e.g. users).
Para esto lo más sencillo es usar un directorio con recurse=>true y purge=>true, asi los recursos que desactivemos serán borrados.


A mano:
delete from catalog_resources where exported='t' and catalog='' and resource='';

Mirar los recursos de un nodo en particular:
SELECT title FROM catalog_resources WHERE type='File' AND exported='t' AND catalog=(SELECT catalog FROM catalog_resources WHERE title='_client4.com' AND type='Nagios_host' AND exported='t');

No es buena idea tocar a mano la base de datos. Puede que luego no aparezcan los exported resources.
