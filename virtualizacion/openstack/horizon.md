http://docs.openstack.org/developer/horizon/

Horizon is the canonical implementation of Openstack’s Dashboard, which provides a web based user interface to OpenStack services including Nova, Swift, Keystone, etc

Video introductorio a Horizon
https://www.youtube.com/watch?feature=player_embedded&v=p4eW78gHfCg
A la izquierda, debajo del logo de Openstack encontramos dos tabs (si nos logeamos como administrador). Projects tab and Admin tab. Admin tab solo le será mostrado al usuario administrador.

Los end-users verán solo la pestaña Project.

Las instancias son las VW.
Volumes, discos para las instancias. (genéricamente es un 'resource')


!!En mi dashboard, dentro de la pestaña Poject, no veo dos apartados: "Manage Networks" y "Object Store"!!
Parece que también debería salir en la pestaña admin.

Network topology nos sirve para tener una visión gráfica de los elementos de red que tenemos creados.


El Object store nos sirve para subir ficheros a un Container que creemos.


Access & Security

  Keypairs: podemos crear las claves ssh que se inyectarán en las máquinas creadas para poder luego conectarnos a ellas con un fichero .pem
