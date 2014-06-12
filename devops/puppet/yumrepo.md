http://docs.puppetlabs.com/references/latest/type.html#yumrepo

Defined type de puppet para definir repositorios yum

Repo local:
yumrepo { 'local':
    descr => "Local repository",
    baseurl => "file:///vagrant/localrepo",
    gpgcheck => 0,
}


# Modificar prioridades
exec { 'modify_epel_repo':
  command => "sed -r 's#priority=([0-9]+)#priority=1#g' epel.repo",
  cwd     => '/etc/yum.repos.d',
  path    => ['/bin','/usr/bin'],
  onlyif  => 'test -e /etc/yum.repos.d/epel.repo',
}

# Ensure that repo is up to date
exec { 'yum-clean-cache':
  user     => 'root',
  path     => '/usr/bin',
  command  => 'yum clean expire-cache',
}
