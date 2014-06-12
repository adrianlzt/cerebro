# Boxes 2.0 #
http://www.vagrantup.com/blog/feature-preview-vagrant-1-5-boxes-2-0.html
https://github.com/mitchellh/vagrant/blob/master/website/docs/source/v2/boxes/versioning.html.md

https://vagrantcloud.com/
Nuevo sistema para buscar, descargar y usar las boxes, estilo index de docker.

Para agregar una máquina:
vagrant box add hashicorp/precise64
o
config.vm.box = "hashicorp/precise64"

Se puede forzar una versión de la box
--box-version
config.vm.box_version
= 1.2.3,  >= 1.2.3, < 2.0.0


Comprobar si tenemos alguna box outdated:
vagrant box outdated

Actualizar boxes
vagrant box update


Ver máquinas de otro users:
https://vagrantcloud.com/discover/featured



Listado de boxes publicas:
http://www.vagrantbox.es
  La web no se actualiza muy amenudo, pero podemos mirar en los pulls máquinas más nuevas: https://github.com/garethr/vagrantboxes-heroku/pulls
https://github.com/fgrehm/vagrant-lxc/wiki/Base-boxes
http://puppet-vagrant-boxes.puppetlabs.com/



Mostrar boxes:
vagrant box list -i  (para mostrar url y fecha de añadido)


Añadir box:
vagrant box add nombre http://developer.nrel.gov/downloads/vagrant-boxes/CentOS-6.4-x86_64-v20130427.box

Eliminar box:
vagrant box remove <nombrebox> <provider>


Las boxes se almacenan en ~/.vagrant.d/boxes



## Crear boxes ##

*Virtualbox
Exportar una máquina virtual como ovf, ...
http://docs.vagrantup.com/v2/virtualbox/boxes.html
http://briceno.mx/2012/10/easy-guide-to-create-a-vagrant-box-from-virtualbox/


*LXC
https://github.com/fgrehm/vagrant-lxc/wiki/Base-boxes#available-boxes
http://fabiorehm.com/blog/2013/07/18/crafting-your-own-vagrant-lxc-base-box/

http://www.bonusbits.com/main/HowTo:Setup_CentOS_LXC_Container_on_Ubuntu
http://www.bonusbits.com/main/HowTo:Create_Vagrant_CentOS_LXC_Box_on_Ubuntu

No probado
