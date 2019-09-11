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



# Pageinspect
https://www.postgresql.org/docs/current/pageinspect.html

Mirar páginas de memoria a bajo nivel.
Útil para debugging

heap_page_items(get_raw_page(a,b))



# Formato block
8kB
-----------------header--------------------------------
pointer-1slot|pointer-2slot|---free space--------------
----free space-----------------------------------------
SLOT2(xmin|xmax|...|values)|SLOT1(xmin|xmax|...|values)

Cuando hacemos un update que actualiza un row, por ejemplo el slot1, tenemos que crear un nuevo puntero y un nuevo slot.
Esto obliga a actualizar todos los indexes para apuntar al nuevo puntero.
Los índices tienen almacenado los valores del bloque y del offset del puntero (por ejemplo, bloque 50, offset puntero 2, este sería el pointer-2slot).

## HOT updates
Si usamos HOT (Heap Only Tuple) updates, lo que estamos haciendo es reusar el pointer del slot 1 para apuntar al nuevo slot3 y asi evitar tener que modificar los índices.
Desde el slot3 se tendrá un puntero al slot1 (al antiguo que hemos actualizado).
Esto solo sirve si no modificamos valores almacenados en el índice.

Es una buena mejora, ahorramos mucho IO de actualización de índices.
Y también tenemos mejoras con el vacuum, haciendo una pequeña limpieza en el bloque únicamente.
Se van borrando los rows ya no visibles.

El fillfactor es el porcentaje de espacio libre que dejamos en los bloques para poder hacer HOT updates.

Si no tenemos espacio para meter los datos en el mismo bloque, tendremos que usar otro bloque y tendremos que actualizar los índices.

pg_stat_user_tables
n_tup_ins
n_tup_hot_upd

Si sabemos que updates hacemos que podrían ser hot updates, mirando las estadísticas, podríamos saber si tenemos que subir el fillfactor para mejorar ese ratio.

Tener índices no necesarios podrían bloquear hot updates y tener penalización.
