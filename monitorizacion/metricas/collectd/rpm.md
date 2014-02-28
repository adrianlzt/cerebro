Collectd viene con un fichero .spec para generar el rpm
https://github.com/collectd/collectd/blob/master/contrib/redhat/collectd.spec

Dentro de ese fichero encontraremos las instrucciones para generarlo.
Hacerlo con el usuario makerpm (con root da error de permisos)
Mirar también: linux/rpm/empaquetar/mock.md

La versión empaquetada 5.4.0 tiene el .spec anticuado, por lo que deberemos coger este:
https://github.com/collectd/collectd/blob/296fec5ad60587485013993c5f5aad2a38834049/contrib/redhat/collectd.spec


Si sale este mensaje en el ./configure
configure: error: "Some plugins are missing dependencies - see the summary above for details"

Es que tenemos algún plugin "no (dependency error)".

Los RPMs generados quedarán en /var/lib/mock/centos-6-x86_64/result
