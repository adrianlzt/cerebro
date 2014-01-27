http://docs.puppetlabs.com/guides/language_guide.html

Condiciones
    file { 'sshdconfig':
      path => $operatingsystem ? {
        solaris => '/usr/local/etc/ssh/sshd_config',
        default => '/etc/ssh/sshd_config',
      },
      owner => 'root',
      group => 'root',
      mode  => '0644',
    }

Crear dependencia del fichero anterior
    service { 'sshd':
      subscribe => File['sshdconfig'],
    }
