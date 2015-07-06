pumount
para desmontar unidades removibles como usuario normal
para redhat like


umount
solo nos dejará si no hay procesos usando ficheros. Será necesario matar esos procesos para poder desmontar la partición.
Ideas: arrancar en single-user. Pasar a otro runlevel single user. Probar el parámetro "-l" (lazy)


Remontar en read write:
mount -o remount,rw /
