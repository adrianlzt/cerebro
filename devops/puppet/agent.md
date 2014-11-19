puppet agent --test
Para forzar la ejecución del agente

Ejecutar puppet sin realizar cambios
puppet agent -t --noop


puppet agent -t --environment=pro


puppet agent -t --summarize
  En vez de lo que hace nos saca un resumen de lo que ha pasado, tiempos, cambios, eventos, etc

FACTER_operatingsystem=WINDOZZ puppet apply -e 'notify { "We are running on $::operatingsystem": }'
  override facts

Mostrar salida en formato html (para los colores)
puppet agent -t --color=html
--color=false  sin colores


Si el puppet agent corriendo como demonio (/etc/init.d/puppet) no puede conectar con el servidor, usará el ultimo catalog que encuentre.

puppet agent -t --vardir=VARDIR --confdir=CONFDIR --certname=CERTNAME --environment=ENV --server=puppet.service.dsn.inet --noop
