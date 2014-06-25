Para usar lxc: https://github.com/fgrehm/vagrant-lxc


## Ejecutar un script diferente dependiendo si estamos en un provider u otro ##
https://docs.vagrantup.com/v2/providers/configuration.html

  config.vm.provider :lxc do |lxc, override|
    override.vm.box = "fgrehm/trusty64-lxc"
    lxc.container_name = 'mysql'  # Sets the container name to 'mysql'
$script = <<SCRIPT
echo "vamos a hacer LXC"
SCRIPT
    override.vm.provision :shell, :inline => $script
  end


  config.vm.provider :virtualbox do |vb, override|
    override.vm.box = "centos64"
$script = <<SCRIPT
echo "vamos a hacer virtualbox"
SCRIPT
    override.vm.provision :shell, :inline => $script
  end

