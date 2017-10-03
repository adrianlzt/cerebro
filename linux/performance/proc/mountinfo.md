https://www.kernel.org/doc/Documentation/filesystems/proc.txt
3.5 /proc/<pid>/mountinfo - Information about mounts

36 35 98:0 /mnt1 /mnt2 rw,noatime master:1 - ext3 /dev/root rw,errors=continue
(1)(2)(3)   (4)   (5)      (6)      (7)   (8) (9)   (10)         (11)

(1) mount ID:  unique identifier of the mount (may be reused after umount)
(2) parent ID:  ID of parent (or of self for the top of the mount tree)
(3) major:minor:  value of st_dev for files on filesystem
(4) root:  root of the mount within the filesystem
(5) mount point:  mount point relative to the process's root
(6) mount options:  per mount options
(7) optional fields:  zero or more fields of the form "tag[:value]"
(8) separator:  marks the end of the optional fields
(9) filesystem type:  name of filesystem of the form "type[.subtype]"
(10) mount source:  filesystem specific information or "none"
(11) super options:  per super block options


Ejemplos:
110 22 8:4 / /home rw,relatime shared:61 - ext4 /dev/sda4 rw,lazytime,stripe=8191,data=ordered

En el disco /dev/sda4, su raiz (/), la montamos sobre /home (según el punto de vista del proceso del que hayamos obtenido el mountinfo)


231 22 8:1 /var/lib/docker/plugins /var/lib/docker/plugins rw,relatime - ext4 /dev/sda1 rw,lazytime,stripe=8191,data=ordered
En el disco /dev/sda1, montamos el dir /var/lib/docker/plugins sobre /var/lib/docker/plugins

