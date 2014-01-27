https://github.com/fgrehm/vagrant-cachier
http://fgrehm.viewdocs.io/vagrant-cachier

Instalación:
vagrant plugin install vagrant-cachier


Para activarlo:
Vagrant.configure("2") do |config|
  config.vm.box = 'your-box'
  if Vagrant.has_plugin?("vagrant-cachier")
    config.cache.auto_detect = true


Espacio ocupado
du -h -d0 $HOME/.vagrant.d/cache
du -h -d0 .vagrant/machines/*/cache
