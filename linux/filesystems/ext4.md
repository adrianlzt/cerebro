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
