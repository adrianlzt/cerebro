Tipo de particionado de disco usado por BIOS.

La BIOS esperará leer del MBR la lista de particiones primarias y buscará entre ellas la que tenga el "active flag".
Luego ejecutará el "Volume Boot Record" de esa partición.

Un gestor de arranque tipo GRUB lo que hará es sustituir el código del MBR por uno suyo propio, que básicamente apuntará a otra parte del disco donde estará almacenado grub y su configuración.
