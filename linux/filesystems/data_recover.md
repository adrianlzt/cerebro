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

