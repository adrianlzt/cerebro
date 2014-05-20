Usar LXC con vagrant
https://github.com/fgrehm/vagrant-lxc

LXC boxes: https://github.com/fgrehm/vagrant-lxc/wiki/Base-boxes

apt-get install lxc

vagrant plugin install vagrant-lxc
vagrant box add quantal64_lxc http://dl.dropbox.com/u/13510779/lxc-quantal-amd64-2013-05-08.box
vagrant init
vi Vagrantfile
  base -> quantal64_lxc 
vagrant up --provider=lxc
vagrant ssh

Network (no hay private network ni public)
Mirar network.md


CentOS 6.5 amd64 for vagrant-lxc with Puppet 3.3.2
Vagrant-LXC
https://dl.dropboxusercontent.com/s/x1085661891dhkz/lxc-centos6.5-2013-12-02.box

Me funciona correctamente con vagrant 1.5.4, vagrant-lxc (1.0.0.beta1.dev), lxc-1.0.3-0ubuntu3 y ubuntu 11.04


Con 'vagrant lxc sudoers' podemos quitar la necesidad de meter la password todo el rato.
A partir de versión 1.0.0.alpha.2

