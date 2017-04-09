http://ceph.com/
Almacen de objetos para poner por encima glance, swift, docker volumes (rex-ray), etc
Tambien podemos crear un almacen de bloques para exponer como si fuese un disco duro a un pc.
O usar cephfs para montar como un sistema de ficheros que puede ser compartido.

Ceph se basa en trocear la información y almacenarla en distintos discos duros del cluster.


Monitores de clúster (ceph-mon), mantienen un control de actividad y fallos en los nodos del cluster.
Servidores de metadatos (ceph-mds), almacenan los metadatos de inodos y directorios.
Dispositivos de Almacenamiento de Objetos (ceph-osds), actualmente es el que almacena el contenido de los archivos


Puede almacenar objetos (RGW) o bloques (RBD)

Si queremos tener un sistema de ficheros distribuido (varios clientes con acceso simultaneo) podemos montar XXX encima de un almacen de bloques (RBD) de ceph. O usar cephfs.

Tambien se puede usar como filesystem (cephfs).
mirar cephfs.md
