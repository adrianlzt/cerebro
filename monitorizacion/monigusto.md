https://github.com/monigusto/vagrant-monigusto

Box de vagrant con un montón de herramientas de monitorización para jugar con ellas.

A single server box that contains the most common/current tools for monitoring like graphite, statsd, collectd, nagios, logstash, jmxtrans, tasseo , gdash , librato and sensu . Then it becomes easy for a developer to get used to the management and monitoring and without the hassle of setting it up from scratch or finding out how to make it work together


git clone https://github.com/monigusto/vagrant-monigusto.git monigusto
cd monigusto
sudo gem install bundler
Comentar el fichero Gemfile y eliminar la instalación de vagrant, porque si no jode la instalación que tengamos.
bundle install
bundle exec rake monigusto:install
vagrant box add ubuntu-12.04 https://opscode-vm.s3.amazonaws.com/vagrant/boxes/opscode-ubuntu-12.04.box (Intento usar una lxc)

El Vagranfile es para la version 1.0.x de Vagrant. Lo rehago para v2 y lxc
sudo apt-get install redir  (si no lo teniamos ya, usado por vagrant-lxc para redirigir puertos)
[server] The cookbook path '/home/adrian/Documentos/monigusto/monigusto/cookbooks' doesn't exist. Ignoring...


