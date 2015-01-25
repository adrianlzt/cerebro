Nos ayuda a utilizar kvm.
Mediante ficheros XML se genera una configuración con la que luego se llama a kvm/qemu con unos parámetros determinados.

Localmente:
virsh

Remoto por ssh:
virsh -c qemu+ssh://adrian@192.168.1.36/system
