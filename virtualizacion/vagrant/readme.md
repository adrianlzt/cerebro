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
