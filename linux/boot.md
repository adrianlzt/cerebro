https://0xax.gitbooks.io/linux-insides/content/Booting/linux-bootstrap-1.html
https://wiki.archlinux.org/index.php/Master_Boot_Record
http://www.cyberciti.biz/tips/10-boot-time-parameters-you-should-know-about-the-linux-kernel.html

1.- mirar mbr.md

2.- se carga un bootloader. Ej.: grub2 o syslinux

Linux especifica un protocolo de boot que debe cumplir el bootloader: https://github.com/torvalds/linux/blob/master/Documentation/x86/boot.txt
mirar grub.md

3.- El bootloader pone unos registros a unos valores determinados y carga el kernel en memoria.
Kernel setup execution starts from arch/x86/boot/header.S at _start.  (https://github.com/torvalds/linux/blob/master/arch/x86/boot/header.S#L293)

4.- El kernel usara código ensamblador hasta cargar https://github.com/torvalds/linux/blob/master/arch/x86/boot/main.c



Se sigue el proceso de boot: the boot process will load the kernel and an initial ramdisk; then the kernel converts initrd into a "normal" ramdisk, which is mounted read-write as root device; then /linuxrc is executed; afterwards the "real" root file system is mounted, and the initrd file system is moved over to /initrd; finally the usual boot sequence (e.g. invocation of /sbin/init) is performed. initrd is used to provide/load additional modules (device driver). For example, SCSI or RAID device driver loaded using initrd.


El contenido de initrd se puede ver, mirar linux/initramfs.md


# boot dir
fichero vmlinux*.hmac
parece que es un checksum del kernel
