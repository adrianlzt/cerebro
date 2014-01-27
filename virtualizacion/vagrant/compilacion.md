Para tener la última versión:

Es necesario tener la versión 2.0 de ruby (mirar linux/ubuntu/ruby.md)

git clone https://github.com/mitchellh/vagrant.git
cd vagrant
sudo bundle install
sudo rake install
sudo mv /usr/bin/vagrant /usr/bin/vagrant-1.4.0
sudo ln -s /var/lib/gems/1.9.1/bin/vagrant /usr/bin/vagrant

Tengo el código en ~/Documentos/vagrant/vagrant
