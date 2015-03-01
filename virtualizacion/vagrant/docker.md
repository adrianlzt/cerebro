https://www.vagrantup.com/blog/feature-preview-vagrant-1-6-docker-dev-environments.html

Vagrant 1.6.0
No funciona sobre LXC
New provisioner: Docker. Install Docker, pull containers, and run containers easier than ever
http://docs.vagrantup.com/v2/provisioning/docker.html

Ejemplos:
Vagrant.configure("2") do |config|
  config.vm.provision "docker" do |d|
    d.pull_images "ubuntu"
    d.pull_images "vagrant"
  end
end

Vagrant.configure("2") do |config|
  config.vm.provision "docker" do |d|
    d.run "rabbitmq"
  end
end

Vagrant.configure("2") do |config|
  config.vm.provision "docker" do |d|
    d.run "ubuntu",
      cmd: "bash -l",
      args: "-v '/vagrant:/var/www'"
  end
end
