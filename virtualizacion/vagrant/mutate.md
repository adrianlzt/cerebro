https://github.com/sciurus/vagrant-mutate

Plugin para hacer conversiones entre tipos de virtualizadores:
Virtualbox to kvm
Virtualbox to libvirt
Libvirt to kvm
Kvm to libvirt

apt-get install qemu-utils
vagrant plugin install vagrant-mutate

vagrant mutate NOMBRE libvirt
vagrant mutate NOMBRE kvm

Si son imagenes de vagrant cloud habrá que hacer un pequeño apaño.
El nombre sera  usuario-VAGRANTSLASH-version
Y tendremos que hacer un link de la version a '0':

Ejemplo:
ubuntu/trusty64                 (virtualbox, 14.04)
cd ~/.vagrant.d/boxes/ubuntu-VAGRANTSLASH-trusty64
ln -s 14.04/ 0
vagrant mutate --input_provider=virtualbox ubuntu-VAGRANTSLASH-trusty64 kvm



# Ova  a qcow2 (kvm)
tar xvf imagen.ova
.ova ->
        .ovf
        .vmdk

qemu-img convert -O qcow2 Evergreen_trunk_Squeeze-disk1.vmdk Evergreen_trunk_Squeeze.qcow2
Crear una maquina virtual y ponerle el qcow2 como disco

