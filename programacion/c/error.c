#include <stdio.h>
#include <fcntl.h> // constantes O_xxx
#include <errno.h>

int main(int arg_count,char ** arg_values)
{
  fprintf(stderr, "Hello World standar error\n\n");

  open("/no/existe", O_RDONLY);
  perror("Opening file");
  printf("Error number: %d\n", errno);

  return 0;
}
