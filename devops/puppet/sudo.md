https://forge.puppetlabs.com/saz/sudo

Purge current sudo config
class { 'sudo': }

Purge sudoers.d directory, but leave sudoers file as it is
class { 'sudo':
  config_file_replace => false,
}

Leave current sudo config as it is
class { 'sudo':
  purge               => false,
  config_file_replace => false,
}

class { 'sudo': }
sudo::conf { 'web':
  source => 'puppet:///files/etc/sudoers.d/web',
}
sudo::conf { 'admins':
  priority => 10,
  content  => "%admins ALL=(ALL) NOPASSWD: ALL",
}
sudo::conf { 'joe':
  priority => 60,
  source   => 'puppet:///files/etc/sudoers.d/users/joe',
}
