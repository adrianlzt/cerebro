https://docs.puppetlabs.com/references/latest/type.html#service
puppet describe service | less


service { 'sshd':
  ensure     => running,
  enable     => true,
  hasrestart => true,
  hasstatus  => true,
}

ensure => stopped

enable hace referencia a si arrancará al inicio.

El hasrestart y hasstatus podemos ponerlo a false si el script del init.d no puede ejecutar esas acciones.
En ese caso podemos nosotros definir el comando.


hasstatus:
If set to false, it uses pgrep

hasrestart
Specify that an init script has a `restart` command.  If this is false and you do not specify a command in the `restart` attribute,    the init script's `stop` and `start` commands will be used.


Service "manual"
service { 'carbon-cache':
  ensure     => running,
  provider   => base,
  binary     => '/opt/graphite/bin/carbon-cache.py',
  start      => '/opt/graphite/bin/carbon-cache.py start',
  status     => '/opt/graphite/bin/carbon-cache.py status',
  hasstatus  => true,
}


service { 'cyclops':
  ensure => running,
  hasstatus => false,
  start => "sudo -u cyclops /usr/bin/python2.7 ${install_dir}/src/scripts/run_server.py -c ${install_dir}/src/conf/dev.json &",
  status => "pgrep python2.7 -u cyclops",
}

