puppet agent -t --environment=pro

Tambien se puede definir el entorno en /etc/puppet/puppet.conf
[main]
   ...
   environment = pro
   ...

Asi podemos decirle al master que entorno queremos usar en el master.


Si definimos un modulepath específico en el puppet.conf del master:
modulepath = $vardir/initiatives/$environment/modules:$vardir/initiatives/monitoring:/etc/puppet/modules

Nos pedirá que exista $vardir/initiatives/production, ya que es el environment por defecto.
Podemos crear un enlace:
cd $vardir/initiatives/
ln -s /etc/puppet/modules production


## Via ENC ##
The value from the ENC is authoritative, if it exists. If the ENC doesn’t specify an environment, the node’s config value is used.
http://docs.puppetlabs.com/puppet/latest/reference/environments.html#setting-up-environments-on-a-puppet-master
