1. Checkpoint el proceso que queremos migrar
     Obtenemos toda la info del proceso que vamos a necesitar.
     Parar el proceso como ptrace()
     Obtener info de /proc/PID

     Parasite code
       Inyectamos código en el proceso para que CRIU pueda enviar comandos que se ejecuten desde dentro del namespace del proceso
       La acción principal es hacer un dump de la memoria desde dentro
       Este código se elmina cuando se ha terminado su función
       Si tenemos SELinux habrá que hacer ciertos tuneos

    Matar el proceso original

3. Restoring
     Leer imágenes
     clone() para cada pid/tid (clone3 en Linux 5.5). Se solucionan problemas que existían con clone(), condiciones de carrera, etc
     Se abren los FDs a la misma posición
     Mapear memoria
     Cargar settings de seguridad
     Saltar al proceso restaurado
