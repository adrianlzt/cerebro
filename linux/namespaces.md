http://man7.org/linux/man-pages/man7/namespaces.7.html
network/namespace.md
linux/filesystems/namespace.md

Concepto para aislar recursos.
Se esperan tener 10 (escuchado en la charla de http://www.slideshare.net/joshuasoundcloud/linux-containers-from-scratch-velocity-barcelona-2014).
Ahora mismo hay 6 implementados:


       Namespace   Constant        Isolates
       IPC         CLONE_NEWIPC    System V IPC, POSIX message queues
       Network     CLONE_NEWNET    Network devices, stacks, ports, etc.
       Mount       CLONE_NEWNS     Mount points
       PID         CLONE_NEWPID    Process IDs
       User        CLONE_NEWUSER   User and group IDs
       UTS         CLONE_NEWUTS    Hostname and NIS domain name

Una idea es como si tuviesemos distintas dimensiones. Y las cosas que están en una dimensión no se puede comunicar, ni saber que existen, cosas en las otras dimensiones.
Un ejemplo fácil es con las redes. Podemos tener un namespace donde tengamos una interfaz configurada con una red, y otro namespace con otra interfaz distinta que esté configurada para una red completamente distinta.
La interfaz física solo puede vivir en uno de los namespaces.

/proc/[pid]/ns/ 
  no se para que puede servir. Siempre aparecen los mismos ficheros


# PID
Con este aislamiento conseguimos que los procesos del namespace no vean los PID de los otros namespaces.
El valor PID que puede tener un proceso visto desde el host es distinto que el valor que tiene dentro del namespace (de un container donde esté corriendo).
