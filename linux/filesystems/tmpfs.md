http://www.jamescoyle.net/how-to/943-create-a-ram-disk-in-linux


mkdir /mnt/ramdisk
mount -t tmpfs -o size=512m tmpfs /mnt/ramdisk
