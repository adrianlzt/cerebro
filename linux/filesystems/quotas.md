EXTn:
La información se almacena en ficheros físicos en el directorio raiz: aquota.user y aquota.group

XFS (por defecto en RHEL 7):
Almacena esa información dentro de los metadatos

soft-quota, se puede superar pero solo durante el "grace time", a partir de ese tiempo ese valor de ocupación se convierte en tu hard-quota.
  Si tienes límites de 1GB y 2GB, y tiene 1.5GB durante más de grace time, no podrás crear más ficheros (pasar de 1.5GB)

hard-quota, no se puede superar.

Las quotas de grupo de aplican a todos los usuarios del grupo.


Hace falta que el kernel soporte quotas (por defecto)
El FS debe soportar y estar montado con quotas (algunos FS tiene sus sistemas de quotas particulares): 
mount -o remount,usrquota,grpquota /
quotacheck -cug /
  Crea /aquota.user y /aquota.group . Tarda mucho, porque tiene que analizar todo el disco (del orden de 5' por 100GB).
  Puede dar un warning de que no quiere analizar un sistema montado, se puede forzar con -n sin peligro
quotacheck -avug
  Actualiza /aquota.user y /aquota.group . Tarda mucho, porque tiene que analizar todo el disco.
quotaon
  Activa quotas. Cuando las quotas están actulizadas el uso de disco se actualiza en cada escritura/borrado.
quotaoff
  Desactiva quotas (deja de actualizar uso de disco). Hay que hacer "-avug" si se quiere activar de nuevo


Mostrar quotas y consumos por usuario:
repquota -as
  -a, --all                   report information for all mount points with quotas
  -s, --human-readable        show numbers in human friendly units (MB, GB, ...)

grace: número de días de 'grace time'.

Las quotas pueden definirse según el espacio usado (Space limits) o el número de ficheros (File limits)

Para que un usuario vea sus quotas:
quota


Editar quotas:
edquote -u USUARIO
  Nos saca un editor con el consumo de espacio actual y dos columnas soft y hard para editar.
  Lo mismo para inodos (número de ficheros)
  Los ficheros ocupan como mínimo 4KBi

edquota -t para cambiar el grace limit

El usuario root puede crear ficheros y luego asociarlos a un usuario, de esta manera nos podemos saltar el límite hard.


## BtrFS ##
Tiene su propio sistema. Mirar btrfs
