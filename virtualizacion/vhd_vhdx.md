Discos Virtual Hard Disk v2, VMWare workstation / VirtualBox

Para montarlo:

```bash
pacman -S libguestfs
guestmount --add demo-bastion01-os-managed-disk-pruebas-adri.vhd --inspector --ro /mnt
```
