# Expulsar la bandeja
$ eject

Por debajo hace:
open("/dev/sr0", O_RDWR|O_NONBLOCK)     = 3
ioctl(3, CDROM_LOCKDOOR, 0)             = 0
ioctl(3, CDROMEJECT, 0)                 = 0
close(3)                                = 0
