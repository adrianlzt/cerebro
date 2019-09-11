# FSM / Free Space Map
https://www.postgresql.org/docs/current/storage-fsm.html
Los ficheros de datos (heap) e índices (excepto los index hash), mantiene este fichero (xxx_fsm) para almacenar el espacio disponible en la relation (relatión serán los datos, los índices, etc)

Cuando se borran cosas de un bloque, se empujan los datos a hacia el final del bloque, para dejar siempre el espacio al comienzo.
El FSM se actualiza por VACUUM.


# VM / Visibility map
https://www.postgresql.org/docs/11/storage-vm.html
Los ficheros de datos (heap) mantienen este fichero con las páginas donde se almacenan rows que deben ser visibles para todas las transacciones activas.
También almacena que páginas tienen frozen tuples.
Este fichero se llamará xxx_vm

Tiene un bit para cada block.
Si el bit es set, quiere decir que todos los rows en ese block son visibles para todas las tx.
Nos ahorra chequear si las rows son visibles para nosotros o no.

En pg_xact tenemos la info del estado de las TX para poder saber si se puede definir el visibility map.
xmin tiene la info de la tx que creó el row.

Lo pone el vacuum.


# Frozen older rows
En los rows hay otro bit para decir que los rows son antiguos y siempre son visibles.
No me queda del todo claro.


# Freeze map
Mantiene lista de páginas freezed.
Para evitar freeze de páginas ya freezed.



# Espacio usado en disco
Mirar disk_usage.md
