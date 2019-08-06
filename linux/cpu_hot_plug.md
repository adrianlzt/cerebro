https://www.cyberciti.biz/faq/debian-rhel-centos-redhat-suse-hotplug-cpu/

Si se añaden CPUs a Linux, estás no son directamente usadas, hay que marcarlas para que se usen:
echo 1 > /sys/devices/system/cpu/cpu<id>/online

En virtualbox si veía que según las añadía se empezaban a usar directamente.
Creo que también hay que desactivarlas antes de quitarlas.


Parece es que muchos programas no se dan cuenta de las nuevas CPUs si no los reiniciamos.
Por ejemplo htop.
