Historia e internals: http://lwn.net/Articles/342892/
En desarrollo, inestable: https://btrfs.wiki.kernel.org/index.php/Main_Page
http://www.funtoo.org/wiki/BTRFS_Fun -> problemas en centos 6 x86_64 al seguir la guía.

# Crear filesystem
mkfs.btrfs -m raid0 -d raid1 /dev/loop0 /dev/loop1 /dev/loop2

By default the behavior is:
metadata is replicated on all of the devices. If a single device is used the metadata is duplicated inside this single device (useful in case of corruption or bad sector, there is a higher chance that one of the two copies is clean). To tell btrfs to maintain a single copy of the metadata, just use single. Remember: dead metadata = dead volume with no chance of recovery.
data is spread amongst all of the devices (this means no redundancy; any data block left on a defective device will be inaccessible)

	-m, --metadata profile
	-d, --data type
	Valid values are raid0, raid1, raid10 or single.

# Información sobre los filesystem btrfs
btrfs filesystem show

