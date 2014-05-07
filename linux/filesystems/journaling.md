JOURNALING:

Siempre se hace journal de los metadatos, pero no siempre se garantiza que se escriba después de los datos. Opcionalmente puede hacerse journal también de los datos.

Cuando el sistema arrancar hace un replay del log de journal, así se asegura de que los metadatos estén correctos (ante un apagon por ejemplo)

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
