# FSM / Free Space Map
https://www.postgresql.org/docs/current/storage-fsm.html
Los ficheros de datos (heap) e índices (excepto los index hash), mantiene este fichero (xxx_fsm) para almacenar el espacio disponible en la relation (relatión serán los datos, los índices, etc)


# VM / Visibility map
https://www.postgresql.org/docs/11/storage-vm.html
Los ficheros de datos (heap) mantienen este fichero con las páginas donde se almacenan rows que deben ser visibles para todas las transacciones activas.
También almacena que páginas tienen frozen tuples.
Este fichero se llamará xxx_vm


# Espacio usado en disco
Mirar disk_usage.md
