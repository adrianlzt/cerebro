Para arrancar la máquina y provisionarla:
vagrant up --provision

Hace halt+up
vagrant reload --provision

Provisionar. Se pueden modificar las recetas y provisionar de nuevo. Funcionará mientras no toquemos el Vagrantfile
vagrant provision


Vagrant.configure("2") do |config|
  config.vm.provision "puppet"
end

Vagrant búscará un fichero "default.pp" en el directorio "manifests" (en la directorio donde esté el Vagrantfile)

Estas localizaciones se pueden reemplazar con las directivas:
Vagrant.configure("2") do |config|
  config.vm.provision "puppet" do |puppet|
    puppet.manifests_path = "my_manifests"
    puppet.manifest_file = "default.pp"
  end
end

Si queremos usar módulos (el directorio "modules" tendrá que estar donde el Vagrantfile, tenemos que definirlo con puppet.module_path):
Vagrant.configure("2") do |config|
  config.vm.provision "puppet" do |puppet|
    puppet.module_path = "modules"
  end
end


Y podemos meter "facts":
Vagrant.configure("2") do |config|
  config.vm.provision "puppet" do |puppet|
    puppet.facter = {
      "vagrant" => "1",
      'fqdn' => config.vm.hostname
    }
    # Take any FACTER_ prefixed environment variable and set it as a fact for
    # vagrant to give to puppet during provisioning.
    ENV.each do |key, value|
      next unless key =~ /^FACTER_/
      puppet.facter[key.gsub(/^FACTER_/, "")] = value
    end
  end
end

Now, the $vagrant variable in your Puppet manifests will equal "1".

También podemos usar las variables que nos proporciona el facter dentro de los manifiestos puppet (por ejemplo $::hostname)


Additional options:
Vagrant.configure("2") do |config|
  config.vm.provision "puppet" do |puppet|
    puppet.options = "--verbose --debug"
  end
end

Más parámetros:
    conf.vm.provision :puppet,
      :options => ["--debug", "--verbose", "--summarize"],
      :facter => { "fqdn" => "puppet" } do |puppet|


## ERRORES ##
Warning: Config file /etc/puppet/hiera.yaml not found, using Hiera defaults

Se arregla definiendo: 
config.vm.provision :puppet do |puppet|
  ...
  puppet.options = "--hiera_config /vagrant/hiera.yaml"


Warning: Could not retrieve fact fqdn

Se arregla definiendo el hostname+dominio en el Vagrantfile
config.vm.hostname = "vagrant.example.com"




