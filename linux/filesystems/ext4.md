https://opensource.com/article/17/5/introduction-ext4-filesystem


Estos parámetros irian en las opciones de montaje

lazy_itable_init=1  # inicializacion diferida del FS (para FS grandes)
                    # el montaje contesta que se ha montado inmediatamente, pero en realidad sigue inicializándose en background

noauto_da_alloc     # deshabilita fsync() automatico
                    # fsync -> pasar los datos modificados de memoria a disco
		    # solo se produciría cuando se forzase por código, ejecutándolo a mano (sync) o al desmontar el volumen

journal_ioprio=N    # modifica prioridad del journal sobre I/O normal
                    # los procesos jbd* son los encargados de escribir el journal
		    # con este parámetro podemos modificar esa prioridad


Format:
mkfs.ext4 /dev/vdb



Crear ext4 sin journal, por si sale este error:
JBD2: no valid journal superblock found
EXT4-fs (sdf1): error loading journal

mke2fs -t ext4 -O ^has_journal /dev/sdf1



# Internals
https://ext4.wiki.kernel.org/index.php/Ext4_Disk_Layout

Extended File System (Ext*)
– Basados en UFS (UNIX File System)
– Bloques = FAT/NTFS clústers
– Ext2
• Superbloque -> 1024 bytes (al principio del FS). Tamaño bloque,
número total bloques. Firma “buscable” -> 0xEF53 (potencias
de dos y separación)
• Grupos de bloques: Backup de superbloque, Block Group
Descriptor Table (tabla de estructura para cada grupo de
bloques, dirección de los bitmaps de bloques y de i-nodos),
bitmap de bloques (del grupo) y bitmap de inodos (del grupo)
• Tablas de i-nodos


Extended File System (Ext*)
– Ext2
• Tablas de inodos -> punteros a los inodos (del grupo)
• Inodos -> Cada inodo es un fichero/directorio: metadatos
de cada fichero (tamaño, propietario, permisos, MAC y
Deletion). Normalmente 128 bytes/inodo (todos del
mismo tamaño en el FS)
• Inodos reservados:
– El primer inodo guarda info de Bad blocks
– El segundo inodo -> Directorio raíz
– El inodo 11 -> Primer inodo de usuario (“lost+found”)

Estructura de un inodo
inodo_structure.jpg
http://k16.kn3.net/B5EAA1EFF.jpg

Los indirects son como punteros. El single indirect apunta a otro inodo, y ese inodo estará lleno de direcciones de memoria de otros inodos con los datos.
Para poder almacenar más datos se usan double indirect y triple indirect.
http://i.imgur.com/jFWJdFr.png

Ext-3 ya tiene journaling (inodo 8)



Ext4
– Fs de gran tamaño (1 Exbibyte ~ 1 Exabyte) 10^18 bytes
– Extents (Bloques físicos continuos) -> Mejora rendimiento
– Asignación persistente en disco
– Asignación retrasada de espacio en disco
– 64.000 subdirectorios/ficheros max (y más)
– Journaling con checksums
– Timestamps en nanosegundos
– Se añade Creation time a metadatos
