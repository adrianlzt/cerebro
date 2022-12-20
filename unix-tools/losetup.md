http://linuxcommand.org/man_pages/losetup8.html

Montar una imagen .dd / raw

sudo losetup -f -P disk.img

Ver los devices
losetup -l

Montar:
mount /dev/loop0 /mnt



sudo losetup /dev/loop4 imagen.dd -o $((2048*512))
  2048 es el primer bloque de la partición, nos lo dice fdisk -l
  512 es el tamaño de bloque, nos lo dice también fdisk


Luego es probable que tengamo que darle permisos de lectura si queremos que otro user pueda leerlo, montarlo, analizarlo...
sudo chmod o+r /dev/loopX


Desmontar un loop device
sudo losetup -d /dev/loop4
