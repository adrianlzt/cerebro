https://wiki.openstack.org/wiki/Cinder

Cinder provides an infrastructure for managing volumes in OpenStack. It was originally a Nova component called nova-volume, but has become an independent project since the Folsom release.

While Cinder contains many different storage drivers, the most common and basic configuration uses LVM and iSCSI. This guide illustrates how to use one disk (/dev/sdb) in an LVM Volume Group called cinder-volumes. When a user requests a block storage volume, a Logical Volume is created from this Volume Group and then mounted on the user's instance by way of iSCSI.
http://docs.openstack.org/grizzly/basic-install/apt/content/basic-install_controller.html


Quality Of Service.
A partir de la release Icehouse se puede dar valores a los backend donde se almacena la información para después afinar donde queremos crear nuestros volumenes.

Volume Types: para poder elegir en que Storage Tier queremos nuestro volumen (HDD, HDD-SSD, SSD, ...)
Con volume retype podemos cambiar esto una vez creado el volumen.


Backends disponibles:
https://wiki.openstack.org/wiki/CinderSupportMatrix


En el caso de usar ceph como backend:
Mostrar imagenes almacenadas en ceph:
rados ls --pool images | grep "rbd_id"


Mostrar estado de los servicios:
cinder-manage service list



Crear volumen a mano:
sudo cinder-rootwrap /etc/cinder/rootwrap.conf env LC_ALL=C lvcreate -n volume-b7327770-43b6-456b-9aeb-da61055e0bff stack-volumes-lvmdriver-1 -L 6g


# LVM
Si usamos LVM como backend parece que hace:

Crea un LV sobre el VG que le hayamos especificado.
Ese LV lo usa como un PV para crear otro VG.
Y dentro de ese VG crea un LV que monta en la VM.

Y luego lo exporta como iSCSI


# Errores
## Volumen que no se borra
Probar con (necesitamos ser admins del proyecto):
cinder force-delete XXX

Buscar ERROR en los logs de cinder-volume

Parece que por debajo intenta:
sudo cinder-rootwrap /etc/cinder/rootwrap.conf lvremove --config activation { retry_deactivation = 1}  -f stack-volumes-lvmdriver-1/volume-1911fd7a-faf8-4ea7-aad6-9dd25c70435f

Mirar con "lvs" a ver si tenemos warning, indicando posibles problemas.
Intentando borrar con lvremove me dice que está siendo usando.
Haciendo "pvs" veo que forma parte de un VG.


