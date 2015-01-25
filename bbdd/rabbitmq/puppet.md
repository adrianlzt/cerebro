http://forge.puppetlabs.com/puppetlabs/rabbitmq

class { '::rabbitmq': }

rabbitmq_user { 'dan':
  admin    => true,
  password => 'bar',
}

rabbitmq_vhost { 'myhost':
  ensure => present,
}

rabbitmq_user_permissions { 'dan@myhost':   <- usuario@virtualHost
  configure_permission => '.*',
  read_permission      => '.*',
  write_permission     => '.*',
}


Query datos (si tenemos puppet instalado y el módulo cargado)
puppet resource rabbitmq_user
puppet resource rabbitmq_vhost
puppet resource rabbitmq_plugin
