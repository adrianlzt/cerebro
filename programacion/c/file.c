#include <stdio.h>

// Write wraps a kernel call, and it's not buffered. It just copies n bytes from the buffer to the file descriptor.
// fprintf is buffered and also it is meant to do string processing and replace the various %d, %s with the parameters, 
// so it is much more complex to execute for this reason, having to parse the string that it receives.

int main (int arg_count,char ** arg_values) {
  FILE *filedesc = fopen("testfile.txt", "a+");
  fprintf(filedesc,"hola\n");
  fclose(filedesc);
  return 0;
}
