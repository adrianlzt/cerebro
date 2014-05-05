http://man7.org/linux/man-pages/man5/proc.5.html
https://www.kernel.org/doc/Documentation/filesystems/proc.txt

## /proc/$(pidof proceso)/fd
File descriptors de los ficheros
Podemos ver a donde apuntan on ls -la
Si un proceso a abierto un FD, pero hemos borrado el fichero, podemos recuperarlo haciendo cp ../fd/N fichero
Si borramos un fichero creado por un proceso, hasta que el proceso no libere el fd no se libera el espacio ocupado en disco


## /proc/$(pidof proceso)/stat

## /proc/$(pidof proceso)/status
https://www.kernel.org/doc/Documentation/filesystems/proc.txt
Viene explicado cada campo en su propia linea

memoria, usuarios, signales, cpus, context switches...
