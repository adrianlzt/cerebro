exec { 'bundle install':
    command => '/usr/bin/bundle install',
    cwd => $document_root,
    logoutput => true,
}

exec { 'bundle install':
    command => '/usr/local/rvm/bin/rvm 1.9.3@rocci-server do bundle install',
    cwd => '/home/occi/rocci-server',
    logoutput => true,
}


Otra opción: https://github.com/puppetlabs-operations/puppet-bundler
