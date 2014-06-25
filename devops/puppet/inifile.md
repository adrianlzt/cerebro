https://github.com/puppetlabs/puppetlabs-inifile


  ini_setting { "puppet_server":
    ensure => present,
    path => "/etc/puppet/puppet.conf",
    section => "main",
    setting => "server",
    value => "puppet",
  }

