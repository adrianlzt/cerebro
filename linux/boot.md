https://0xax.gitbooks.io/linux-insides/content/Booting/linux-bootstrap-1.html
https://wiki.archlinux.org/index.php/Master_Boot_Record
http://www.cyberciti.biz/tips/10-boot-time-parameters-you-should-know-about-the-linux-kernel.html
https://wiki.archlinux.org/index.php/Unified_Extensible_Firmware_Interface_(Espa%C3%B1ol)#Proceso_de_arranque_bajo_UEFI

1.- Encendido del sistema — se inicia Power On Self Test — o el proceso POST (https://en.wikipedia.org/wiki/es:POST).

1.- BIOS/UEFI hardware
    mirar mbr.md o uefi.md
1.1- Se carga el firmware UEFI. El firmware inicializa el hardware necesario para el arranque.

2.- se carga un bootloader. Ej.: grub2 o syslinux
2.1.- El firmware lee el gestor de arranque para determinar qué aplicación UEFI iniciar, y desde dónde (es decir, desde qué disco y partición).
2.2.- El firmware UEFI inicia la aplicación desde la partición UEFI definida en la entrada de arranque del gestor de arranque del firmware.
2.3.- La aplicación UEFI puede iniciar otra aplicación (como la shell de UEFI o un gestor de arranque como rEFInd), o el kernel y el initramfs (en el caso de un gestor de arranque como GRUB) en función de cómo se ha configurado la aplicación UEFI.

Linux especifica un protocolo de boot que debe cumplir el bootloader: https://github.com/torvalds/linux/blob/master/Documentation/x86/boot.txt
mirar grub.md

3.- El bootloader pone unos registros a unos valores determinados y carga el kernel en memoria.
Kernel setup execution starts from arch/x86/boot/header.S at _start.  (https://github.com/torvalds/linux/blob/master/arch/x86/boot/header.S#L293)

4.- El kernel usara código ensamblador hasta cargar https://github.com/torvalds/linux/blob/master/arch/x86/boot/main.c


All 2.6 Linux kernels contain a gzipped "cpio" format archive (initramfs), which is extracted into rootfs when the kernel boots up.  After extracting, the kernel checks to see if rootfs contains a file "init", and if so it executes it as PID 1.  If found, this init process is responsible for bringing the system the rest of the way up, including locating and mounting the real root device (if any).  If rootfs does not contain an init program after the embedded cpio archive is extracted into it, the kernel will fall through to the older code to locate and mount a root partition, then exec some variant of /sbin/init out of that.

Se sigue el proceso de boot: the boot process will load the kernel and an initial ramdisk (initramfs); then the kernel converts initrd into a "normal" ramdisk, which is mounted read-write as root device; then /linuxrc is executed; afterwards the "real" root file system is mounted, and the initrd file system is moved over to /initrd; finally the usual boot sequence (e.g. invocation of /sbin/init) is performed. initrd is used to provide/load additional modules (device driver). For example, SCSI or RAID device driver loaded using initrd.
initramfs needs to contain all of the device drivers and tools needed to mount the final root file system


El contenido de initrd se puede ver, mirar linux/initramfs.md


# boot dir
fichero vmlinux*.hmac
parece que es un checksum del kernel
