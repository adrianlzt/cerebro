http://www.jamescoyle.net/how-to/943-create-a-ram-disk-in-linux


mkdir /mnt/ramdisk
mount -t tmpfs -o size=512m tmpfs /mnt/ramdisk


Si no se define el size, será la syscall mount quien tomará la decisión.
https://www.kernel.org/doc/Documentation/filesystems/tmpfs.txt
Por defecto la mitad del tamaño de la memoria.
https://github.com/torvalds/linux/blob/e033e7d4a8081852b2cca53e530e2c0f4e6769c0/mm/shmem.c#L126

CUIDADO!
If you oversize your tmpfs instances the machine will deadlock since the OOM handler will not be able to free that memory.

Las particiones tmpfs no reservan espacio hasta que se usan.
