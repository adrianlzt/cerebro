Montar iso:
sudo mount -o loop rhel-server-6.3-x86_64-dvd.iso /mnt/

Create iso:
http://www.ispexperts.com.np/?p=650
mkisofs -r -o /fully-qualified-file-name-of-iso-image.iso /name-of-directory-containing-files-to-format-into-iso-image 


Descomprimir iso
apt-get install p7zip-full


Crear iso a partir de un cd:
dd if=/dev/cdrom of=/tmp/cdimg1.iso
