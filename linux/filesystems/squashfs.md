http://squashfs.sourceforge.net/

Squashfs is a compressed read-only filesystem for Linux. Squashfs is intended for general read-only filesystem use, for archival use (i.e. in cases where a .tar.gz file may be used), and in constrained block device/memory systems (e.g. embedded systems) where low overhead is needed.


Descomprimir una imagen:
sudo unsquashfs airootfs.sfs
  sudo por si algun fichero tiene extended attributes que necesitan de root. Ejemplo:
  write_xattr: could not write xattr security.capability for file squashfs-root/usr/bin/ping because you're not superuser!

