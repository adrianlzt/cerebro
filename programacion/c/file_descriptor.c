#include <stdio.h>
#include <unistd.h> // open(), close()
#include <fcntl.h> // constantes O_xxx

// Write wraps a kernel call, and it's not buffered. It just copies n bytes from the buffer to the file descriptor.
// fprintf is buffered and also it is meant to do string processing and replace the various %d, %s with the parameters, 
// so it is much more complex to execute for this reason, having to parse the string that it receives.
//
// open, write, close son llamadas del sistema, no son parte de la libreria de C

int main (int arg_count,char ** arg_values) {
  int filedesc = open("testfile.txt", O_RDWR | O_APPEND | O_CREAT, 0664);
  write(filedesc,"hola\n",5);
  close(filedesc);
  return 0;
}
