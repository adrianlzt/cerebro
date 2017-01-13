The "cow" part of qcow2 is an acronym for copy on write


http://en.wikibooks.org/wiki/QEMU/Images#Copy_on_write

qemu-img create -f qcow2 -b winxp.img test01.img 
qemu -m 256 -hda test01.img -kernel-kqemu &

  Aqui lo que hacemos es usar la imagen winxp.img como base.
  Sobre ella montamos una capa copy-on-write, test01.img.
  Arrancamos la maquina, y esta imagen se monta como un dispositivo de bloques.
  Lo que la vm ve al inicio es el contenido de winxp.img
  Según vaya haciendo cambios en el sistema, estos se guardan en test01.img


Info:
qemu-img info imagen.qcow2

Cambiar imagen base (para renombrar la imagen base):
qemu-img rebase -u -b nuevabase disco2.qcow2


# Montar imagen

## Montar directamente qcow2
http://zeeshanali.com/sysadmin/mounting-qcow2-image-in-linux-without-kvm/


## Convertir el .qcow2 a .raw y luego montar0
la imagen primero la converti de qcow2 a raw: qemu-img convert -O raw master-2.qcow2 master-2.img

Una vez convertida a raw
https://major.io/2010/12/14/mounting-a-raw-partition-file-made-with-dd-or-dd_rescue-in-linux/
fdisk -l harddrive.imb
  cogemos el valor de "start" y lo multiplicamos por el tamaño de bloque (512 generalmente)
sudo mount -o ro,loop,offset=32256 harddrive.img /mnt/loop

Si da problemas al montar:
sudo fsck /dev/loop2
mount /dev/loop2 /mnt/loop


## Con libguestfs
sudo guestmount -a master-2.img -i /mnt
  esto pertenece al paquete libguestfs

Desmontar
sudo umount /mnt


Cambiar password de root:
virt-customize -a master-2.qcow2 --root-password password:prueba
