Si queremos extraer un kernel de un vmlinuz podemos usar el script
https://github.com/torvalds/linux/blob/master/scripts/extract-vmlinux

vmlinuz
Linux kernel x86 boot executable bzImage, version 3.13.0-35-generic (buildd@panlong) #62-Ubuntu SMP Fri Aug 15 01, RO-rootFS, swap_dev 0x5, Normal VGA

./extract-vmlinux vmlinux > vmlinux

Lo que nos dejará será un tipo de ficheero ejecutable: 
ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, BuildID[sha1]=02fa54897275e03d7b935425c6b22082932e2ffb, stripped

