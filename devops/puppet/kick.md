http://docs.puppetlabs.com/references/3.6.2/man/kick.html

DEPRECATED?
https://projects.puppetlabs.com/issues/15735
https://tickets.puppetlabs.com/browse/PUP-1135


Remotely control puppet agent

SYNOPSIS
Trigger a puppet agent run on a set of hosts.

La conexión es desde el comando que ejecuta puppet kick hacia la máquina que debe estar escuchando en el puerto TCP 8139


/etc/puppet/puppet.conf
[agent] o [main] o [default]
listen=true

/etc/puppet/auth.conf
# Allow puppet kick access
path    /run
method  save
auth    any
allow   puppet.com
