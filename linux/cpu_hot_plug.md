Si se añaden CPUs a Linux, estás no son directamente usadas, hay que marcarlas para que se usen:
echo 1 > /sys/devices/system/cpu/cpu<id>/online


Creo que también hay que desactivarlas antes de quitarlas.


Haciendo pruebas con virtualbox, tras añadirlas funcionaban automáticamente y si las intentaba deshabilitar con "echo 0" seguían funcionando.
