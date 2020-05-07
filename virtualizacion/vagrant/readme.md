Competencia: footloose, levanta containers que parecen VMs


mkdir directorio/
cd directorio/
vagrant init [nombreVox]
vagrant add box nombre /bla/bla/maquina.box
vi Vagrantfile -> cambiar el tipo a nombre
vagrant up
vagrant ssh nombre

El directorio donde mete todo es $HOME/.vagrant.d/boxes/

La búsqueda del fichero Vagrantfile se produce desde el directorio donde estemos, escalando hacia arriba hasta encontrar uno.
También se puede forzar la búsqueda del fichero vagrant con VAGRANT_CWD


Para una box que ya existe
vagrant box list
vagrant init chef/centos-7.0
vagrant up

Si es virtualbox
vagrant up --provider=virtualbox
La máquina se creará en virtualbox con el nombre del directorio_nnnnn


USER/PASSWORD
vagrant vagrant
