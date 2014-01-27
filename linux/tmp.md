http://wiki.centos.org/TipsAndTricks/TmpOnTmpfs

I personally wouldn't recommend putting '/var/tmp' on tmpfs. I make this recommendation based on the following reason: The FHS (Filesystem Hierarchy Standard) states that '/var/tmp' is for 'Temporary files preserved between system reboots'. And since the contents of tmpfs do not survive a reboot, putting '/var/tmp' on tmpfs would make your system incompatible with the FHS. Which could cause applications to malfunction or behave unexpectedly.


tmpfs no es un ramdisk: "A ramdisk is guaranteed to be in RAM, tmpfs may be swapped out."


## /dev/shm ##
http://www.cyberciti.biz/tips/what-is-devshm-and-its-practical-usage.html

/dev/shm is nothing but implementation of traditional shared memory concept. It is an efficient means of passing data between programs. One program will create a memory portion, which other processes (if permitted) can access. This will result into speeding up things on Linux.

Everything in tmpfs is temporary in the sense that no files will be created on your hard drive


Lo que creo en /dev/shm aparece en la columna de cached del comando free.
