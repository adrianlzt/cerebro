http://www.busybox.net/

Es un único binario que lleva integrados todos los típicos comandos de un linux.
Depende como lo llamemos ejecutará uno u otro comando

busybox --list-full
  para ver todos los comandos implementados

Típico despliege:

for i in $(busybox --list-full); do
  ln -s /bin/busybox $i
done


Tambien podemos usar enlaces duros.


En debian busybox tiene linkado estatico.
En arch tiene linkado dinámico, por eso necesita de otras librerias.

Tambien podemos obtener un binario dinamicamente:
http://www.busybox.net/downloads/binaries/latest/
