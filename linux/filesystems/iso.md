Montar iso:
sudo mount -o loop rhel-server-6.3-x86_64-dvd.iso /mnt/

Create iso:
http://www.ispexperts.com.np/?p=650
mkisofs -r -o /fully-qualified-file-name-of-iso-image.iso /name-of-directory-containing-files-to-format-into-iso-image 


Descomprimir iso
apt-get install p7zip-full


Crear iso a partir de un cd:
dd if=/dev/cdrom of=/tmp/cdimg1.iso


Modificar una iso:
https://wiki.archlinux.org/index.php/Remastering_the_Install_ISO

mkdir /mnt/archiso
sudo mount -t iso9660 -o loop /path/to/archISO /mnt/archiso
cp -a /mnt/archiso ~/customiso

Crear la iso (dos opciones):
mkisofs -o CentOS-7.0-1406-x86_64-DVD.iso -b isolinux/isolinux.bin -c isolinux/boot.cat -no-emul-boot -boot-load-size 4 -boot-info-table -J -R -V "CentOS 7.0 Custom ISO" .
genisoimage -l -r -J -V "ARCH_201209" -b isolinux/isolinux.bin -no-emul-boot -boot-load-size 4 -boot-info-table -c isolinux/boot.cat -o ../arch-custom.iso ./


