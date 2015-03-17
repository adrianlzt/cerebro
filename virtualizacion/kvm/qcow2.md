The "cow" part of qcow2 is an acronym for copy on write


http://en.wikibooks.org/wiki/QEMU/Images#Copy_on_write

qemu-img create -f qcow2 -b winxp.img test01.img 
qemu -m 256 -hda test01.img -kernel-kqemu &

  Aqui lo que hacemos es usar la imagen winxp.img como base.
  Sobre ella montamos una capa copy-on-write, test01.img.
  Arrancamos la maquina, y esta imagen se monta como un dispositivo de bloques.
  Lo que la vm ve al inicio es el contenido de winxp.img
  Según vaya haciendo cambios en el sistema, estos se guardan en test01.img
