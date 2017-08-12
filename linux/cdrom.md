# Expulsar la bandeja
$ eject

Por debajo hace:
open("/dev/sr0", O_RDWR|O_NONBLOCK)     = 3
ioctl(3, CDROM_LOCKDOOR, 0)             = 0
ioctl(3, CDROMEJECT, 0)                 = 0
close(3)                                = 0


# Se abre solo
Arreglado con este comando:
sudo mv /usr/lib/udev/cdrom_id /usr/lib/udev/cdrom_id.orig
