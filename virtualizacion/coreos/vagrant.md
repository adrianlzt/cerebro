http://coreos.com/blog/coreos-vagrant-images/

Configuración vagrant lista para usar (con virtualbox)


git clone https://github.com/coreos/coreos-vagrant.git
cd coreos-vagrant
cp config.rb.sample config.rb
vi config.rb
  $num_instances=3
  $update_channel='alpha'

cp user-data.sample user-data

Acceder a https://discovery.etcd.io/new
Pegar el token en
vi user-data
  discovery: https://discovery.etcd.io/TOKEN

vagrant up
