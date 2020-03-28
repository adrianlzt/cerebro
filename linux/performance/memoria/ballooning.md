https://rtfmp.wordpress.com/2016/03/18/balloon-driver-linux/
https://www.vmware.com/files/pdf/perf-vsphere-memory_management.pdf
https://pubs.vmware.com/vsphere-4-esx-vcenter/index.jsp?topic=/com.vmware.vsphere.resourcemanagement.doc_40/managing_memory_resources/c_memory_balloon_driver.html
https://access.redhat.com/solutions/901253
https://access.redhat.com/solutions/445113

https://access.redhat.com/solutions/43729
Unaccounted memory usage when running Red Hat Enterprise Linux as a VMware guest
En pdf linkado en este dir


El ballooning es una técnica de VMware para poder reclamar memoria de las VMs en caso de que el hypervisor necesite memoria.
Se hace con un driver que está metido dentro de las VMs. Mediante un canal privado el hypervisor le dice al driver que "infle" el "balón" con el número de págnia que necesita el hypervisor.
El driver marca unas páginas como usadas de tal manera que no se puedan swapear.
Una vez el driver confirma la reserva de las páginas, el hypervisor ya puede hacer uso de esa memoria.

Una posible causa de un balllooning a una máquina es tener configurado un límite de consumo de memoria más bajo que la memoria asignada.
En este caso el hypervisor le robará la memoria que exceda el límite mediante ballooning siempre.
Consultar el límite: vmware-toolbox-cmd stat memlimit

Ej.:
VM con 32GB de memoria asignada.
Definimos el límite máximo de consumo de memoria a la VM en 12GB.
El hypervisor, mediante ballooning, robará 20GB a la VM siempre.


Consultar estado de la memoria con: esxtop
If host free memory drops towards the soft threshold, the hypervisor starts to reclaim memory using ballooning


# Linux
http://superuser.com/questions/704675/vmware-ballooning-state-from-inside-guest

Proceso encargado del ballooning:
ps aux| grep -i vmmemctl
[vmmemctl]


Driver encargado de robar memoria en las VM
El grep que he puesto son ejemplos de varios posibles nombres:
$ lsmod | grep -i -e vmmemctl -e balloon
vmware_balloon          7199  0
vmw_balloon            18094  0
vmmemctl               46424  0


Consultar el valor:

Con las vmware tools:
vmware-toolbox-cmd stat balloon

Sin las vmware tools:
mount -t debugfs none /sys/kernel/debug
cat /sys/kernel/debug/vmmemctl | grep "current" | awk '{print $2*4/1024/1024 " GB";}'


vmmemct: memory balloon driver

# Detalles técnicos
http://lxr.free-electrons.com/source/drivers/virtio/virtio_balloon.c
http://marc.info/?l=kvm&m=138988948715638&w=2
Driver de ballooning de kvm


Algunos detalles técnicos: http://usenix.org/legacy/publications/library/proceedings/osdi02/tech/full_papers/waldspurger/waldspurger_html/node6.html
