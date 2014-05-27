#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>

int main (int arg_count,char ** arg_values) {
  printf("mas normal\n");
  fprintf(stderr,"otro error\n");

  // cerramos stdout y stderr
  close(1);
  close(2);

  // Al abrir nuevos FD tomaran el valor 1 (stdout) y 2 (stderr) respectivamente
  open("stdout.txt", O_RDWR | O_APPEND | O_CREAT, 0644);
  open("stderr.txt", O_RDWR | O_APPEND | O_CREAT, 0644);

  printf("Normal a fichero\n");
  fprintf(stderr,"Error fichero\n");

  return 0;
}
