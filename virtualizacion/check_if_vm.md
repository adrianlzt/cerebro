https://stackoverflow.com/questions/39533/how-to-identify-that-youre-running-under-a-vm

cat /sys/devices/virtual/dmi/id/product_name
muestra el nombre del laptop o placa base. Si es una VM nos mostrará el nombre del hypervisor.

Otra opción usando un programa:
yum install -y virt-what
virt-what
Sin sale sin decir nada es que estamos en baremetal.



Puede darse el caso de que el hypervisor quiera esconderse para que no puedas saber si eres una VM.
En esos casos puede ser complicado saber si estamos en una VM.
