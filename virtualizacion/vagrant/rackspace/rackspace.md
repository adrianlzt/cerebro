https://github.com/mitchellh/vagrant-rackspace

Dummy box:
$ cat metadata.json
{
    "provider": "rackspace"
}

Creo la box: tar zcvf dummy_rackspace.box ./metadata.json
La agrego: vagrant box add dummy_rackspace dummy_rackspace.box

Podríamos meter también un Vagrantfile en el .box: tar cvzf rackspace.box ./metadata.json ./Vagrantfile


Vagrantfile básico:
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  Vagrant.require_plugin "vagrant-rackspace"
  
  config.vm.box = "dummy_rackspace"

  config.vm.provider :rackspace do |rs|
    rs.username = ENV['RAX_USERNAME']
    rs.api_key  = ENV['RAX_API_KEY']
  end
end

La API_KEY la obtenemos en https://mycloud.rackspace.co.uk/a/dralt/account#settings

$ RAX_API_KEY=227f30e2ef2d6796558fe8 RAX_USERNAME=adin vagrant up --provider=rackspace

Por defecto arranca (a 19/10/2013, tras la salida de Saucy):
[default]  -- Flavor: 512MB Standard Instance
[default]  -- Image: Ubuntu 13.10 (Saucy Salamander)
[default]  -- Name: default

$ RAX_API_KEY=227f30e66d6153598fe8 RAX_USERNAME=dinl vagrant ssh


Para simplificar, he dejado un Vagrantfile, credentials.rb y dummy_rackspace.box
