Thread: espacio de memoria compartido
Proceso: espacio de memoria independiente

fork() nos da un nuevo proceso, con una copia de la memoria, que se va modificando según sea necesario (Copy on write)

Los threads, al acceder a las mismas estructuras de datos, deben usar primitivas de sincronización (mutex, condition variables, semaphores)
