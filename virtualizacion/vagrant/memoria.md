config.vm.provider :virtualbox do |vb|
	config.vm.customize ["modifyvm", :id, "--memory", 1024]
end

Vagrant 1.4.0
You can now specify a memory using vb.memory setting with VirtualBox.



Para LXC:
config.vm.provider :lxc do |lxc|
  lxc.customize 'cgroup.memory.limit_in_bytes', '1024M'
end
