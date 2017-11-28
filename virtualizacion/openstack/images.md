http://docs.openstack.org/image-guide/


In a CirrOS image, the login account is cirros. The password is cubswin



El cliente es glance


Crear imagenes:
http://docs.openstack.org/image-guide/create-images-manually.html


# CLI nueva
openstack image create --disk-format iso --public --container-format bare --file /home/adri/AlienVault_OSSIM_64bits.iso --min-disk 10 --min-ram 2048 alienvault_ossi
