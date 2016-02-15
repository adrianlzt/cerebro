# fopen vs open
En el caso de leer unos determinados bytes de /dev/random he visto que fread consume más de los que le pides.
read() lo hace correctamente.


# Seek
https://beej.us/guide/bgc/output/html/multipage/fseek.html

 #include <stdio.h>

 int fseek(FILE *stream, long offset, int whence);
 void rewind(FILE *stream);

Ej.:
fseek(fp, 100, SEEK_SET); // seek to the 100th byte of the file
fseek(fp, -30, SEEK_CUR); // seek backward 30 bytes from the current pos
fseek(fp, -10, SEEK_END); // seek to the 10th byte before the end of file

fseek(fp, 0, SEEK_SET);   // seek to the beginning of the file
rewind(fp);               // seek to the beginning of the file


Tambien con lseek:
#include <unistd.h>
off_t lseek(int fildes, off_t offset, int whence);

*  If whence is SEEK_SET, the file offset shall be set to offset bytes.
*  If whence is SEEK_CUR, the file offset shall be set to its current location plus offset.
*  If whence is SEEK_END, the file offset shall be set to the size of the file plus offset.
