http://ceph.com/
Almacen de objetos para poner por encima glance, swift, docker volumes (rex-ray), etc

Monitores de clúster (ceph-mon), mantienen un control de actividad y fallos en los nodos del cluster.
Servidores de metadatos (ceph-mds), almacenan los metadatos de inodos y directorios.
Dispositivos de Almacenamiento de Objetos (ceph-osds), actualmente es el que almacena el contenido de los archivos


Puede almacenar objetos (RGW) o bloques (RBD)

Tambien se puede usar como filesystem (cephfs). 9/4/2017 -> technology preview en RedHat (no listo para producción)
Este filesystem puede ser compartido por varios cliente simultaneamente en modo lectura/escritura.
