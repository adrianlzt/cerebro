vmdk (vmware) -> bin (qemu) -> vdi (virtualbox)
qemu-img convert /path/to/original.vmdk converted.bin
VBoxManage convertdd converted.bin converted.vdi
