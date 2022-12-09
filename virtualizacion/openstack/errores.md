Error al crear una instancia.
Puede ser porque hayamos llegado al máximo de puertos para el tenant.



Invalid request due to incorrect syntax or missing required parameters
Hemos pasado una AZ que no existe?



Las instancias fallan con un timeout por el volumen, que no se ha creado a tiempo:
[instance: ef2dd21c-2dbe-44f0-82f6-993bc9ec9928] Instance failed block device setup: nova.exception.VolumeNotCreated: Volume d6f0899b-827b-4317-8d44-99beded4e373 did not finish being created even after we waited 190 seconds or 61 attempts. And its status is creating.
https://www.suse.com/support/kb/doc/?id=000019177
Subir estos valores:
block_device_allocate_retries = 300
block_device_allocate_retries_interval = 3


https://bugs.launchpad.net/charm-nova-compute/+bug/1758607
Explicación de problema

https://docs.openstack.org/nova/ussuri/configuration/config.html#DEFAULT.block_device_allocate_retries
Parámetro para cambiarlo en ussuri, con explicación de como mejorar el performance para evitar este problema.

Para kolla cambiar en los compute y controller nodes
/etc/kolla/nova-compute/nova.conf
```
[DEFAULT]
block_device_allocate_retries = 300
block_device_allocate_retries_interval = 3
```
Config para esperar 15'





ERROR cinder.volume.manager cinder.exception.MetadataCopyFailure: Failed to copy metadata to volume: Glance metadata cannot be updated, key signature_verified exists for volume id 87342572-da41-43bb-9371-4f28e1630716
https://bugs.launchpad.net/cinder/+bug/1823445

openstack image unset --property signature_verified bce29ef9-6d93-4659-bfae-b6675988a294
