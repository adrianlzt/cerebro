#include <stdio.h>
#include <unistd.h> // open(), close()
#include <fcntl.h> // constantes O_xxx

int main (int arg_count,char ** arg_values) {
  int filedesc = open("testfile.txt", O_RDWR | O_APPEND | O_CREAT, 0664);
  printf("antes de dup2()\n");

  // En el FD=1 ahora apunto al FD del fichero testfile.txt
  // El stdout se cerrara
  dup2(filedesc,1);
  printf("despues de dup2()\n"); // Se escribira en testfile.txt

  close(filedesc);
  return 0;
}
