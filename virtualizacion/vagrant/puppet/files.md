file { '/opt/graphite/conf/storage-schemas.conf' :
  ensure => file,
  source => '/vagrant/puppet/files/storage-schemas.conf',
  owner => "root",
  group => "root",
  mode => "0644",
}


Otra forma, no probada: https://ask.puppetlabs.com/question/1826/serving-module-files-with-puppet-osvagrant/
[files]
  path /tmp/vagrant-puppet/files
  allow *

Vagrantfile:
config.vm.synced_folder './', '/tmp/vagrant'
config.vm.provision :puppet do |puppet|
    puppet.options << '--fileserverconfig /tmp/vagrant/fileserver.conf'
end
