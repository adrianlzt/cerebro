# BIOS
Firmware que hace de interfaz entre el hardware (placa base) y el SO.
BIOS necesita que el tipo de particionado tipo MBR


# UEFI
https://wiki.archlinux.org/index.php/Unified_Extensible_Firmware_Interface_(Espa%C3%B1ol)

Para comprobar si nuestro kernel ha cargado desde uefi:
http://askubuntu.com/questions/162564/how-can-i-tell-if-my-system-was-booted-as-efi-uefi-or-bios
dmesg | grep -i efi

Es el mismo concepto que BIOS pero actualizada.
El tipo de particionado de discos que usa es GUID Partition Table (GPT), aunque algunos UEFI pueden permitir arrancar desde GPT.

GPT tiene muchas mejoras sobre MBR
