Los threads consiguen un switching de aplicaciones más rápido al tener que mover menos memoria in/out del procesador.

Thread: espacio de memoria compartido (de forma resumida: se comparte la virtual mem, file descriptors. Se tiene único: stack, data registers, code)
Proceso: espacio de memoria independiente

fork() nos da un nuevo proceso, con una copia de la memoria, que se va modificando según sea necesario (Copy on write)

Los threads, al acceder a las mismas estructuras de datos, deben usar primitivas de sincronización (mutex, condition variables, semaphores)

Los OSs hacen el scheduling en base a threads (no en base a procesos).
