#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <stdio.h>

// Compilar
// gcc -o open file_open.c
// Crea un fichero en /mnt/testfile.txt
// Los códigos de error varian entre no tener permisos o que el punto de montaje este en RO
//
// Mas sobre IO en C: http://www.cs.bu.edu/teaching/c/file-io/intro/
 
int main()
{
    int filedesc = open("/mnt/testfile.txt", O_WRONLY | O_APPEND | O_CREAT);
    if(filedesc < 0) {
        perror("open");
	printf("an error: %d\n", errno);
        return 1;
    }
    if(write(filedesc,"This will be output to testfile.txt\n", 36) != 36)
    {
        write(2,"There was an error writing to testfile.txt\n",43);
        return 1;
    }
 
    return 0;
}
