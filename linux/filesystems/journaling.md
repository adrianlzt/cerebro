JOURNALING:

Siempre se hace journal de los metadatos, pero no siempre se garantiza que se escriba después de los datos. Opcionalmente puede hacerse journal también de los datos.

Cuando el sistema arrancar hace un replay del log de journal, así se asegura de que los metadatos estén correctos (ante un apagon por ejemplo)
Tras montar y hacer el replay se borra.

Tiene un tamaño máximo y comenzará a reescribir.

# garantiza orden (primero se escriben los datos, luego journal de los metadatos). Es el modo por defecto.
data=ordered

# no garantiza orden (podría escribir los datos después que journal de los metadatos, más rendimiento, menos seguro)
data=writeback

# hace journal también de los datos (primero se escribe journal y luego los metadatos).
# Peor rendimiento.
data=journal


Journal en disco separado (más eficiente, sobre todo si es SSD):
mkfs.ext4 -O journal_dev -b 4096 <DEV1>   # crea journal en DEV1
mkfs.ext4 -J device=<DEV1> -b 4096 <DEV2> # asocia journal a DEV2

Para ext4 por defecto 128MiB
https://ext4.wiki.kernel.org/index.php/Ext4_Disk_Layout#Journal_.28jbd2.29

# Internals
Estructura
– Superblock -> Tamaño de bloque, número de bloques disponibles, offset de inicio, número de secuencia, etc,..
– Bloque Descriptor -> Describe comienzo de transacción
– Bloque de metadatos -> Uno o varios por cada transacción (donde se guardan los cambios)
– Bloque Commit -> Indica fin de transacción con éxito
– Bloque Revoke -> Si hay error se crea lista para recuperar
