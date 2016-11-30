http://sirlagz.net/2011/06/19/how-to-keep-linux-permissions-on-a-fat32-formatted-usb-stick/
Como copiar ficheros ext4 en un fat32 sin perder los atributos de los ficheros.

Crearemos un fichero que será una partición linux
dd if=/dev/zero of=usblinux bs=1M count=512
dd if=/dev/zero of=usblinux2 bs=1G count=20 status=progress
  Tendremos que crearlo con el tamaño que necesitemos (en este ejemplo, 20GiB)
mkfs.ext4 usblinux
sudo mount -o loop usblinux /mnt
sudo chown -R adrian:adrian /mnt
rsync -ahP /home/adrian /mnt
sudo umount /mnt
