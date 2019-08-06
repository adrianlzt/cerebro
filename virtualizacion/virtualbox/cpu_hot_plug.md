http://underpop.online.fr/v/virtualbox/cpu-hot-plugging-virtualbox.html.gz

VBoxManage modifyvm "VM name" --cpuhotplug on
  cuando está apagada

VBoxManage modifyvm "VM name" --cpus 8
  límite máximo de cpus que se le pueden añadir

Para añadir/quitar con la VM apagada (el número es el identificador de la cpu a añadir, el 0 es el que viene por defecto, que no podemos quitar):
VBoxManage modifyvm "VM name" --plugcpu 3
VBoxManage modifyvm "VM name" --unplugcpu 3


Para añadir/quitar con la VM encendida:
VBoxManage controlvm "VM name" plugcpu 3
VBoxManage controlvm "VM name" unplugcpu 3


Según le pongamos CPUs aparecerán automáticamente y se empezarán a utilizar.

Parece que para quitar las CPUs tiene que estar instalado el guest additions, para hacer el eject de la cpu
