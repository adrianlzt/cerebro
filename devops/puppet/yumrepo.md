http://docs.puppetlabs.com/references/latest/type.html#yumrepo

Defined type de puppet para definir repositorios yum

Repo local:
yumrepo { 'local':
    descr => "Local repository",
    baseurl => "file:///vagrant/localrepo",
    gpgcheck => 0,
}

