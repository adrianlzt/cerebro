https://maas.ubuntu.com/docs1.5/maascli.html#api-key

La CLI 1.7 con API 1.5 no funciona.


Lo primero que necesitamos es una key.
  Desde la interfaz web, pinchando en el nombre del usuario y preferences
  o desde la consola del region controller:
  maas-region-admin apikey my-username

Ahora desde el pc cliente:
maas login adrian http://REGIONCONTROLLER/MAAS MHfTZ...

Opciones:
maas adrian -h

Opciones de un comando:
maas adrian comando -h



Listar clusters:
maas adrian node-groups list

Actualizar imagenes de boot:
maas adrian node-groups import-boot-images

Listar imagenes boot de un cluster:
maas adrian boot-images read 2bd3cdb4-9bb9-4559-948a-a1f3f5c46b96


# Nodos
Arrancar un nodo:
maas adrian node start node-3c0daaa...

Info sobre un nodo
maas adrian node read node-3c0daaa...

Detalles de un nodo (toda la info que sacó en el comissioning):
maas adrian node details node-3c0daaa...


# Tags
Poner tags a los nodos:
http://astokes.org/using-fastpath-installer-maas/


# Boot images
maas unica boot-images read adeccd8b-a408-4a74-b3b9-78cea17d2b50
