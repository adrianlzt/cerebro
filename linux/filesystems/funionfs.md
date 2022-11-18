deprecated?
usar fuse-overlayfs?


http://funionfs.apiou.org

Union file system.
Mirar aufs.

# Instalación:
yum install funionfs.x86_64


# Uso

First at all, locate the Readonly directory. We call it "ro_dir".

Then, locate the readwrite directory. we call it "rw_dir". This directory will be overlayed over the readonly one to create the composite filesystem.

The mount directory will be called "mnt_dir".

funionfs -o dirs=ro_dir=RO:rw_dir  -o allow_other NONE mnt_dir
