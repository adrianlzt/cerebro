class puppet::foreman (
  $ensure = running,
  $enable = true,
  ) inherits puppet::params {

## Configure the database stuff on the node

  yumrepo { 'foreman':
    descr    => 'The Foreman',
    enabled  => '1',
    gpgcheck => '0',
    baseurl  => 'http://yum.theforeman.org/releases/latest/el6/$basearch',
    notify   => Exec['yum_clean_all'],
  }

  package { 
    'foreman'      : ensure => $puppet::params::foreman_version;
    'foreman-mysql': ensure => $puppet::params::foreman_version;
  }

  file { '/usr/share/foreman':
    owner => 'foreman',
    group => 'root',
  }

  file { '/etc/foreman/settings.yaml':
    ensure  => present,
    content => template('puppet/foreman-settings.yaml.erb'),
    notify  => Service['foreman'],
  }

  file { "/usr/share/foreman/config/settings.yaml":
    ensure => link,
    target => '/etc/foreman/settings.yaml',
  }

  file { "/usr/share/foreman/config/database.yaml":
    ensure  => present,
    content => template('puppet/foreman-database.yaml.erb'),
    notify  => Service['foreman'],
  }

  file { '/usr/lib/ruby/site_ruby/1.8/puppet/reports/foreman.rb':
    content => template('puppet/foreman-report.rb.erb'),
    notify  => Service['foreman', 'puppetunicorn'],
  }

  file { '/etc/nginx/conf.d/foreman.inet.conf':
    source => 'puppet:///modules/puppet/nginx/conf.d/foreman.inet.conf',
    notify => Service['nginx'],
  }

  service { 'foreman':
    ensure => $ensure,
    enable => $enable,
  }


}
