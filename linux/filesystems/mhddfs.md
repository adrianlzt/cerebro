mhddfs is a FUSE plugin that combines data from several directories and present it in one directory. The only downside is that you do not know (or control) where a file is created.

Let’s say you combine /dir1, /dir2 and /dir3 under /virtual. Previously you had /dir1/my_content. This is now /virtual/my_content. If you write a file to /virtual/my_content it will not necessarily end up in /dir1/my_content. This also mean you can not predict what data is lost if you lose a disk.

The plugin is available in Ubuntu

$ sudo apt-get install mhddfs
Using it is pretty simple

$ sudo mkdir /export/hest
$ sudo mhddfs /dir1,dir2,dir3 /export/hest
[sudo] password for alj: 
mhddfs: directory '/dir1' added to list
mhddfs: directory '/dir2' added to list
mhddfs: directory '/dir3' added to list
mhddfs: mount to: /export/hest
mhddfs: move size limit 4294967296 bytes
The “move size limit” deserves an explanation:

if free space size threshold if a drive has the free space less than the threshold specified then another drive will be chosen while creating a new file. If all the drives have free space less than the threshold specified then a drive containing most free space will be chosen.

/dir1;/dir2;/dir3
                      589G  329G  260G  56% /export/hest
                      To mount the combined directory during boot, at this to /etc/fstab:

                      mhddfs#/dir1,/dir2,/dir3 /export/hest fuse defaults,allow_other 0 0
                      we can export the combined directory using NFS or Samba. If you export the combined directory using NFS you need to add the fsid option in /etc/exports

                      /export/hest 192.168.1.0/24(fsid=2,ro,sync,crossmnt,no_subtree_check,insecure)
