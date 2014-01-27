https://wiki.openstack.org/wiki/Cinder

Cinder provides an infrastructure for managing volumes in OpenStack. It was originally a Nova component called nova-volume, but has become an independent project since the Folsom release.

While Cinder contains many different storage drivers, the most common and basic configuration uses LVM and iSCSI. This guide illustrates how to use one disk (/dev/sdb) in an LVM Volume Group called cinder-volumes. When a user requests a block storage volume, a Logical Volume is created from this Volume Group and then mounted on the user's instance by way of iSCSI.
http://docs.openstack.org/grizzly/basic-install/apt/content/basic-install_controller.html
