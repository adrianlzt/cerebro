case $::osfamily {
  'Debian': {
    $sshd::package = 'ssh',
    $sshd::cfgpath = '/etc/ssh'
  }
  'RedHat': {
    ...
  }
  default: { fail("Module '${module_name}' is not currently supported on ${::operatingsystem}") }
}

  package { 'servidorssh':
    name => $::osfamily ? {
            'Debian' => 'ssh',
            'RedHat' => 'openssh',
            default => fail("Module '${module_name}' is not currently supported on ${::operatingsystem}")
    },


if $::osfamily == "Debian" {
  ...
}

if $::operatingsystem == "Ubuntu" {


Mejor usar hiera:
# ntp/data/hiera.yaml
---
:hierarchy:
  - "%{::osfamily}"

# ntp/data/RedHat.yaml
---
ntp::config: /etc/ntp.conf
ntp::keys_file: /etc/ntp/keys
