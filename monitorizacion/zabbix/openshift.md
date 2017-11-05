Ideas monitorizando Openshift de manera dinámica con LDD.

Creamos un template con un autodiscover para crear un host por cada service encontrado en un namespace.
Este template lo implementaremos con un host "dummy".

Este host lanzará un script que devolverá la lista de servicios con su IP y puerto.

DUDA: que hacer, crear uno/varios items por cada service asociados todos al mismo host? Es decir, un host por namespace con todos los services colgando.
O crear un host por cada service y dentro de ese service los items que chequean ese service?

Tal vez esto dependa de cuantos items queremos monitorizar por service.
Si es solo un "check http" tal vez tenga más sentido un host para todos los services.
