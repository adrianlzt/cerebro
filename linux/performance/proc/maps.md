- Muestra el mapa de memoria del proceso (direcciones, permisos, inodos)
- Permisos:

   r = read                     # lectura
   w = write                    # escritura
   x = execute                  # ejecucion
   s = shared                   # compartida
   p = private (copy on write)  # memoria compartida hasta modificarse,
                                # entonces se crea copia privada

- Nombre de la zona:

   name                 # nombre del fichero mapeado
   [heap]               # heap del proceso (comun a todas las hebras)
   [stack]              # stack del proceso
   [stack:TID]          # stack de la hebra TID
   [vdso], [vsyscall]   # VDSO (mecanismo para tener ciertas syscalls en
                        # userspace, sin cambio de contexto)

Las hebras tienen su propio mapa en /proc/<PID>/task/<TID>/maps
