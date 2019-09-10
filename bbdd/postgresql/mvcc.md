Gestión para tener high concurrency

Hacemos todo lo más rápido posible para más tarde limpiar lo que no sea necesario.
Si abrimos una TX, solo cuando se hace el commit el valor está disponible para el resto, un select del cliente B entre el update y commit del cliente A, verá el valor antes del update de A.

Se intentan evitar locks. "Solo" dos updates sobre el mismo row creará el lock.

En vez de actualizar datos, es generar nuevas versiones de los rows y cada versión esta asociada a un transacion id.

Cada row tiene información de la visibilidad:
  xmin: txid cuando fue el row added
  xmax: cuando el row fue actualizado/borrado
  más otros campos

Tenemos el problema de cuando borrar los rows antiguos.

vacuum se encarga de borrar las dead tuples.
El problema es como los índices que apuntan a esas dead tuples que vamos a borrar, escaneando todos los índices para ver donde se está usando.
Al escanear las tablas vamos a puntando en la maintenance_work_mem (6 bytes por puntero), y luego, al escanear la index table, si encontramos punteros en esa maintenance_work_mem, los borramos del índice.

Durante el vacuum no se permite DDL, pero se no se bloquean DML.

Tenemos tablas donde nos dice el estado de los vacuum
