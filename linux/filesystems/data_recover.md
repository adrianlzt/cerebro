http://blog.creativeitp.com/posts-and-articles/linux/disk-analysis-with-fdisk-mmls-fsstat-and-fls/
https://help.ubuntu.com/community/DataRecovery
sleuthkit.md
testdisk.md


Si tenemos problemas para montar una partición, podemos escanear las particiones con mmls (de sleuthkit.md) y luego montarlas definiendo el offset:
$ mmls -t gpt /dev/sdb
...
Units are in 512-byte sectors
...
05:  01      0000004096   0073404415   0073400320   Linux filesystem
...

4096*512=2097152

mount -o loop,offset=2097152 -t ext4 /dev/sdb /mnt


# NTFS

sudo mmls -t gpt /dev/sdb
     Slot    Start        End          Length       Description
07:  03      0001845248   0941760511   0939915264   Basic data partition

1845248*512=944766976

sudo mount --ro -o loop,offset=944766976 -t ntfs /dev/sdb /mnt

