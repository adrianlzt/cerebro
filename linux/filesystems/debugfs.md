https://linux.die.net/man/8/debugfs
https://www.cs.montana.edu/courses/309/topics/4-disks/debugfs_example.html

ext2/ext3/ext4 file system debugger

Nos permite analizar un sistema de ficheros montado, sin montar o una imagen de un fs.

Podemos por ejemplo ver ficheros borrados.
Nos abre una shell para navegar con sus herramientas estilo cd, ls, cat

# Listar ficheros directorios
ls -l

ls -ld
  mostrar tambien los borrados

Format is:
  1:  Inode number.
  2:  First one or two digits is the type of node:
     2 = Character device
     4 = Directory
     6 = Block device
     10 = Regular file
     12 = Symbolic link
     The Last four digits are the Linux permissions
  3. Owner uid
  4. Group gid
  5. Size in bytes.
  6. Date
  7. Time of last creation.
  8. Filename.

# cat

# stat

# dump
Volcar contenido de un inodo a un fichero
dump <2790782> file1-debugfs

dump dir1 dir1-debugfs
  podremos analizarlo con od (mirar el link de montana.edu)o

Podemos por ejemplo hacer un stat de un inodo y hacer dumps de los direct blocks, luego indirects, etc

# lsdel
ficheros borrados, solo para ext2

# mi
modificar inodo (tendremos que arrancar con: debugfg -w, para permitir escritura)
por ejemplo para restaurar un inodo marcado como borrado
