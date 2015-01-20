https://wiki.archlinux.org/index.php/Mkinitcpio

ramdisk que se encarga del inicio del sistema. Antes lo hacia el init del kernel, pero ahora este puede configurar más cosas, es más potente.

An initial ramdisk is a temporary file system used in the boot process of the Linux kernel. initrd and initramfs refer to slightly different schemes for loading this file system into memory. Both are commonly used to make preparations before the real root file system can be mounted.


https://www.kernel.org/pub/linux/utils/boot/dracut/dracut.html
NAME
dracut - low-level tool for generating an initramfs image
