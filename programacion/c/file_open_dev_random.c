//
// En este caso era necesario usar open directamente.
// fopen, fread, etc no leian correctamente
//
#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <stdlib.h>

int main(int argc, char** argv)
{
    if( argc < 2 )
    {  
      printf("Dime cuantos bits leer\n");
      return 1;
    }

    int leer = atoi(argv[1]);
    printf("Bits a leer de /dev/random: %i (redondeado a %i bytes)\n", leer, leer/8);

    int nread;
    char buffer[leer];
    char disponibles_antes[5];
    char disponibles_despues[5];

    int filedesc, disp;
    
    filedesc = open("/dev/random", O_RDONLY);

    if(filedesc < 0) {
      perror("open");
      printf("an error: %d\n", errno);
      return 1;
    }

    disp = open("/proc/sys/kernel/random/entropy_avail", O_RDONLY);

    if(disp < 0) {
      perror("open");
      printf("an error: %d\n", errno);
      return 1;
    }
    
    // leemos cuantos bits hay disponibles
    read(disp, disponibles_antes, 5);
    lseek(disp, 0, SEEK_SET);
    // leemos entropia
    nread = read(filedesc, buffer, leer/8);
    // leemos cuantos bits hay al final
    read(disp, disponibles_despues, 5);
    
    if(nread == -1) {
      write(2,"an read error occured\n",26);
      return 1;
    } else {
      printf("Bits disponibles antes: %i\n", atoi(disponibles_antes));
      printf("Leidos: %i\n", nread*8);
      printf("Bits disponibles despues: %i\n", atoi(disponibles_despues));
      printf("Differencia: %i\n", atoi(disponibles_antes)-atoi(disponibles_despues));
    }

    close(filedesc);
    close(disp);

    return 0;
}  
