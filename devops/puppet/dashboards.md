# Foreman
http://theforeman.org
The Foreman is a complete lifecycle management tool for physical and virtual servers.
Instalarlo con el modulo de puppet

En el foreman marcaremos que modulos se cargarán, y asi no tocaremos el nodes.pp

Los reports que envian los clientes al master, podemos decir que lo envie a foreman, y alli es donde tenemos todo centralizado, y donde podríamos ver si algo está fallando.

Se puede enganchar a vmware para crear maquinas virtuales y provisionarlas automaticamente.

En el dashboard de puppet labs:
Los ticks azules quiere decir que puppet ha revertido algún cambio hecho a mano.



API foreman:
curl -u guest:guest -H "Accept:application/json" http://foreman.inet

Para instalar foreman -> foreman.pp (en este dir)


# Puppet explorer
https://github.com/spotify/puppetexplorer
http://demo.puppetexplorer.io
Puppet web interface written in CoffeeScript using AngularJS 


# Puppet Board
https://github.com/puppet-community/puppetboard
Web frontend for PuppetDB
