Permite que el FS comunique al device (SSD) que ciertos bloques se han borrado (no sólo no usados), ahorrando escrituras.

discard             # opcion de montaje
/sys/block/sda/queue/discard_max_bytes  # 1 si el device soporta TRIM
fstrim              # fuerza trimming


