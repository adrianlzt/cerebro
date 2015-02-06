Si tengo problemas al montar un disco particionado con GTP enchufado con un adaptador USB puede ser porque el conversor USB nos da bloques de 4k pero GTP espera tener bloques de 512b:

https://forums.opensuse.org/showthread.php/485328-Problem-mounting-GPT-partitioned-USB-Hard-Drive
According to fdisk/gdisk, /dev/sdc has 4K blocks but GPT is created for 512B blocks. So it is correct, current GPT is invalid for this disk. If it was indeed installer, it would be major bug. But to prove it we would need to


Lo que dice gdisk del disco montado por usb:
Logical sector size: 4096 bytes


# Volcado de la info GPT
dd if=/dev/sdb of=sdb.part bs=4k count=6

Ver la info traducida:
mmls -t gpt /dev/sdb


Montar una particion a partir de un offset determinado:
http://wiki.edseek.com/guide:mount_loopback#mounting_with_a_specified_offset
El offset lo calculamos multiplicando el valor de start*512 (o 4096, depende de lo que nos diga mmls: "Units are in 512-byte sectors")
mount -o loop,offset=32256 -t ext4 /dev/sdb /mnt
