http://tldp.org/HOWTO/LVM-HOWTO/snapshotintro.html
http://tldp.org/HOWTO/LVM-HOWTO/snapshots_backup.html
http://raldaz.wordpress.com/2008/01/10/haciendo-un-backup-usando-snapshot-de-lvm-instantaneas-lvm/

A snapshot volume can be as large or a small as you like but it must be large enough to hold all the changes that are likely to happen to the original volume during the lifetime of the snapshot.
If the snapshot logical volume becomes full it will be dropped (become unusable) so it is vitally important to allocate enough space.

LVM2 permite snapshotss read/write. Esto nos permite modificar fichero en el snapshot sin modificar el sistema original. Por ejemplo, montar un snapshot lvm, hacer pruebas y luego revertir al original y borrar el snapshot.
Podemos usar snapshots para máquinas virtuales, que como compartiran gran parte de los ficheros el tamaño de las nuevas snapshots será pequeño.


# Crear snapshot
La snapshot ocupa espacio en el grupo de volumen donde esté el volumen lógico que estemos snapshoteando.
Para ver el espacio del que disponemos (Free son los 'extents' libres, VFree nos lo muestra en bytes): 
vgdisplay | grep Free
vgs -o +vg_free_count,vg_extent_count

lvcreate -s -L 100M -n testsnap /dev/testvg/testvol
	-s|--snapshot
	-L|--size LogicalVolumeSize[bBsSkKmMgGtTpPeE]
	-n|--name LogicalVolumeName

Al crearla le decimos el tamaño máximo de cambios que puede guardar.


# Estado snapshots
lvdisplay /dev/new_vg/lvol0
  Aparecerá un apartado "LV snapshot status" si existen snapshots


# Cluster #
LVM snapshots are not cluster-aware, so they require exclusive access to a volume. For information on activating logical volumes on individual nodes in a cluster, see Section 4.8, “Activating Logical Volumes on Individual Nodes in a Cluster” (https://www.centos.org/docs/5/html/Cluster_Logical_Volume_Manager/cluster_activation.html)


# Montar snapshot
mount /dev/NOMBRE_VOLUME_GROUP/NOMBRE_LOGICAL_VOLUME /mnt/directorio

# Comparar snapshot con filesystem
# El % de Data ocupado varia extrañamente. Al crear ficheros y borrar se converva el espacio, pero al crear nuevos ficheros puede que no varíe.
# Si monto el snap sube mucho el Data. Si desmonto sube más.
Montar el snapshot
Listar los ficheros del snapshot:
cd /mnt/directorio; find . -mount > /tmp/tree.snap
cd /dir_orig_snap: find . -mount > /tmp/tree.orig

# Merge, restaurar a partir de un snapshot
http://www.switchroot.com/how-to-rollback-a-lvm-volume-to-its-snapshot
Comprobar si se puede con el comando (debe aparecer "snapshot-merge"):
dmsetup targets

Restaura el LV original con el valor del snapshot vg0/snap0
lvconvert --merge /dev/vg0/snap0

Tras el merge el snapshot se borrará.

Podemos restaurar el volumen de "/". Ejecutamos el comando y reiniciamos. Tras el reinicio se habrá restaurado a los valores del snapshot.

Si el volumen esta montado, el proceso de merge comenzará cuando desmontemos la partición (realmente cuando se active la próxima vez el volumen, pero no podemos desactivar y activar un volumen que tiene por encima un FS montado)
Para ver si esta "merging":
lvs
En la columna "Attr" aparecerá un "O" como primer valor en el volumen original. En el volumen del snapshot pondrá una "S" (deberemos preguntar por él específicamente con lvs)

Si tenemos problemas (creo que open a 1), desactivar el volumen origen y volverlo a activar:
lvchange -an -v vg_dSN/lv_opt
lvchange -ay -v vg_dSN/lv_opt

Problemas mergeando, se queda indefinidamente:
https://www.redhat.com/archives/linux-lvm/2014-February/msg00028.html


# Borrar volumenes o snapshots
http://kb.eclipseinc.com/kb/why-cant-i-remove-a-linux-logical-volume/


# Buscar procesos trabajando en un volumen
dmsetup info -c | grep vol0
Take note of the 5th column, which indicates if a volume is “open,” and the 2nd and 3rd columns, which are the major and minor IDs, respectively.
lsof | grep "major,minor"
lvremove vg_xxx/lv_blabla

