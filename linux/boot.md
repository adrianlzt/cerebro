https://wiki.archlinux.org/index.php/Master_Boot_Record

http://www.cyberciti.biz/tips/10-boot-time-parameters-you-should-know-about-the-linux-kernel.html


Se sigue el proceso de boot: the boot process will load the kernel and an initial ramdisk; then the kernel converts initrd into a "normal" ramdisk, which is mounted read-write as root device; then /linuxrc is executed; afterwards the "real" root file system is mounted, and the initrd file system is moved over to /initrd; finally the usual boot sequence (e.g. invocation of /sbin/init) is performed. initrd is used to provide/load additional modules (device driver). For example, SCSI or RAID device driver loaded using initrd.


El contenido de initrd se puede ver, mirar linux/initramfs.md
