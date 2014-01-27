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
