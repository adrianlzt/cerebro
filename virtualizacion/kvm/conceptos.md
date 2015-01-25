http://serverfault.com/questions/208693/difference-between-kvm-and-qemu

KVM es un módulo del kernel para correr máquinas virtuales.
KVM usa una versión de QEMU modificada para poder funcionar.

KVM (Kernel Virtual Machine) is a Linux kernel module that allows a user space program to utilize the hardware virtualization features of various processors. Today, it supports recent Intel and AMD processors (x86 and x86_64), PPC 440, PPC 970, S/390, ARM (Cortex A15), and MIPS32 processors.

QEMU can make use of KVM when running a target architecture that is the same as the host architecture. For instance, when running qemu-system-x86 on an x86 compatible processor, you can take advantage of the KVM acceleration - giving you benefit for your host and your guest system.



QEMU is a generic and open source machine emulator and virtualizer.

When used as a machine emulator, QEMU can run OSes and programs made for one machine (e.g. an ARM board) on a different machine (e.g. your own PC). By using dynamic translation, it achieves very good performance.

When used as a virtualizer, QEMU achieves near native performances by executing the guest code directly on the host CPU. QEMU supports virtualization when executing under the Xen hypervisor or using the KVM kernel module in Linux. When using KVM, QEMU can virtualize x86, server and embedded PowerPC, and S390 guests.
