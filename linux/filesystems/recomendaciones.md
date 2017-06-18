Parece que los competidores son: ext3, xfs, btrfs y zfs


RAID-0 (y mejor RAID hardware sobre software)
JFS mejor para muchos ficheros pequeños.
XFS mejor para ficheros muy grandes (>16Tb)
F2FS optimizado para Flash/SSD
evitar "sync" en particiones removibles.

mirar btrfs.md, muchas mejoras, pero no mejor velocidad


Benchmark
http://www.phoronix.com/scan.php?page=article&item=linux_314_hdd&num=1 20/2/2014
http://www.phoronix.com/scan.php?page=article&item=linux-412-fs&num=1 20/5/2017
ext4, btrfs, xfsm f2fs
HDD y SDD




# Ext4
Solía se la elección por estabilidad y seguridad.
Limitado si tenemos que almacenar ficheros de más de 16TB o particiones de más de 1EB.
No parece ya tener ventajas de velocidad sobre los otros
Máximo 8 symlinks
Por defecto en Ubuntu/Debian

# XFS
Buen rendimiento. Diseñado para soportar grandes ficheros (8EB) y particiones (16EB).
Completely multi-threaded, can support large files and large filesystems, extended attributes, variable block sizes, is extent based, and makes extensive use of Btrees (directories, extents, free space) to aid both performance and scalability.
Por defecto en RHEL7
Máximo 8 symlinks

# BTRFS
Posiblemente el futuro de los FS en linux.
Btrfs is intended to address the lack of pooling, snapshots, checksums, and integral multi-device spanning in Linux file systems.
Está como tech preview en RHEL 7
Por defecto en Sus Enterprise
Offers advanced management, reliability, and scalability features. Btrfs provides checksum verification for files as well as metadata. It also offers snapshot and compression capabilities, and integrated device management.
btrfs before linux-4.4 and btrfs-progs-v4.4 is simply not worth the risk (https://wiki.debian.org/Btrfs)

# ZFS
De solaris, muy completo y robusto.
integridad de datos (protección contra la corrupción de bits, etc), soporte para altas capacidades de almacenamiento, la integración de los conceptos de sistema de archivos y gestión de volúmenes, snapshots y copy-on-write clones, chequeos de integridad continua y reparación automática, RAID-Z y NFSv4 soportado nativamente
Añadido a Ubuntu 16.04
