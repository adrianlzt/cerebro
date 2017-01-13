Consultar datos de la partición:

tunefs -l /dev/sda1


# Reserved block count
Número de bloques reservados a "Reserved blocks uid" y "Reserved blocks gid".
Esto es una medida de seguridad, generalmente EXT* deja un 5% libre que solo puede escribir root.

En particiones que no tengan partes críticas del sistema podemos bajar o eliminar este límite.
tune2fs -m 0 /dev/sda1


http://unix.stackexchange.com/questions/7950/reserved-space-for-root-on-a-filesystem-why
En ext3 no reducir este límite si el disco va a estar mucho tiempo lleno por encima del 95%, problemas de performance.
En ext4 no debería suceder.
