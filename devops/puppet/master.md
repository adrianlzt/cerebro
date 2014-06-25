Para crear un master:
rpm -ivh http://yum.puppetlabs.com/el/6/products/i386/puppetlabs-release-6-7.noarch.rpm
yum install puppet-server
service puppetmaster start

En los /etc/hosts de los slaves, que la ip del server este como puppet
a.b.c.d puppet

En el slave:
/etc/puppet/puppet.conf:
[main]
	server = puppet

Y para conectar con el master:
puppet agent --test
Correrá una vez, y se autentificará contra el servidor (petición de certificado que el master firmará).
Las pruebas las estamos haciendo con master+client en el mismo pc, asi que se autofirma.

En el caso de que fuesen distintas máquinas.
En el servidor, para ver las peticiones de firma de certificado:
puppet cert list

Para ver tambien los ya firmados:
puppet cert list --all

Y para firmar un certificado:
puppet cert sign <nombre> 


## Puppet 3.5 en adelante ##
Se define un directorio donde se encuentran todos los manifests. Ya no hay un site.pp.
Cada nodo busca su "node ... {}" y se lo aplica (solo se aplicará un node a cada nodo.
El código que este fuera de node{} se aplicará a todos los nodos.

Todos los nodos deben matchear un node, por lo que casi siempre deberemos tener un "node default {}" para los nodos que no hagan match en otro node.



Ahora las máquinas que se conecten contra el master mirarán el fichero: /etc/puppet/manifests/site.pp
En este fichero podemos poner directamente código. 
Por ejemplo podríamos poner un:
package {'sshd':
  ensure	=> installed,
}
Para asegurarnos que todas las máquinas tienen el sshd instalado.

Pero la mejor forma es ir definiendo a cada servidor que clases se le van a aplicar.
node 'nombre-maquina' {
  class {'ntp':
    enable	=> false,
    ensure	=> stopped,
  }
}

El 'nombre-maquina' esta definido en el cliente en /etc/puppet/puppet.conf (certname)
Es el nombre de certificado que se dará.
En el servidor se podría ver con: puppet cert list --all

Una manera más limpia de organizar es meter en el site.pp:
import 'nodes/*.pp'

Y generar ficheros tipo: nodes/localhost.pp
node 'localhost' {
  class {'apache': }
  class {'ntp':
    enable      => false,
    ensure      => stopped,
  }
}

En el caso de que un nodo no encuentre su hostname, usará el node default.
node default {
  include common
}

Tambien suele hacerse que todos los nodos hereden la configuración del default.
node 'nombre' inherits default {
  ...
}


Los modulos los generarimos en el master en /etc/puppet/modules
puppet module generate adri-test
Generamos los dos directorios porque no vienen por defecto:
mkdir adri-test/files
mkdir adri-test/templates


Obtener parámetros de configuración:
/usr/bin/puppet master --configprint pidfile <- donde genera el fichero pid


## Reinicio
Si reiniciamos puppet master mientras se está conectando un agente saldrán distintos errores depende donde haya pillado el corte.
En cualquier caso el último error será:
Error: Could not send report: Connection refused - connect(2)
