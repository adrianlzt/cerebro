https://access.redhat.com/solutions/98873

yum install yum-plugin-versionlock

yum versionlock list

yum versionlock gcc-*

/etc/yum/pluginconf.d/versionlock.list


Otra idea parecida, desactivar el repo desde donde instalamos el paquete y solo activarlo cuando queremos actualizar.
