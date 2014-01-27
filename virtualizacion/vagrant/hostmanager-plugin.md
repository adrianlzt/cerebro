https://github.com/smdahlen/vagrant-hostmanager

A Vagrant plugin that manages the /etc/hosts file on guests within a multi-machine environment


vagrant plugin install vagrant-hostmanager

config.hostmanager.enabled = true
config.hostmanager.manage_host = true

To update the /etc/hosts file on each active machine, run the following command:
$ vagrant hostmanager
