Apagar la instancia.

Entrar en el compute node que la aloja

Ir al directorio (las x son el id de la vm):
/var/lib/nova/instances/xxxxxx-xxxx-xxxxx-xxxxx-xxxxxxx

Obtener la imagen base con este comando (backing file):
qemu-img info disk

Montar la imagen base:
sudo guestmount -a /var/lib/nova/instances/_base/a4f95a74d587ba93cc89a9c36c95fcd12f74c906 -i /mnt/imagen_base

Modificar los ficheros que sean necesarios en /mnt/imagen_base

Desmontar la imagen:
sudo umount /mnt/imagen_base

Arrancar de nuevo el servidor


No tengo claro quien más puede usar la base. Tal vez este no sea el mejor método.
Tal vez montar el disk en vez de la base?

