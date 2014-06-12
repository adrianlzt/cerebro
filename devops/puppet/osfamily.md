case $::osfamily {
  'debian': {
    $sshd::package = 'ssh',
    $sshd::cfgpath = '/etc/ssh'
  }
  'redhat': {
    ...
  }
}
