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


## Secure boot
https://uefi.org/sites/default/files/resources/UEFI_Secure_Boot_in_Modern_Computer_Security_Solutions_2013.pdf

Fundamentally, the UEFI Secure Boot feature attempts to prohibit the execution of unprotected code prior to the engagement of the operating system.

The core issue is ensuring that a system boots without introducing compromised code.

Ensuring that boot code is executed without modification requires the use of a digital signature. A digital signature, provided by a trusted code creator, is embedded in every executable code section. Using public/private key pairs, the code creator “signs” their code with a private key, which can be checked against a public key in a pre-stored signature before it is executed.

It is important to note that a compromised system is typically not allowed to complete the bootstrap process in a compromised state.

### Linux
https://wiki.archlinux.org/title/Unified_Extensible_Firmware_Interface/Secure_Boot

Comprobar si tenemos configurado el secure boot.

bootctl status
  buscar "Secure boot" en "System".


https://cloudone.trendmicro.com/docs/workload-security/agent-linux-secure-boot/
When Secure Boot is enabled, the computer's Linux kernel checks the PKI signature of each kernel module before it is loaded. It won't load unsigned kernel modules, nor modules with invalid signatures.


Parece que para gestionar las claves en un pc físico (o vmware) se hace uso de la herramienta "mokutil"
https://cloudone.trendmicro.com/docs/workload-security/agent-linux-secure-boot/#enroll-a-secure-boot-key-for-vmware-vsphere-or-physical-computers
Teniendo que reiniciar para aceptar las claves añadidas.
