#include <stdio.h>
#include <string.h>
#include <errno.h>

// Write wraps a kernel call, and it's not buffered. It just copies n bytes from the buffer to the file descriptor.
// fprintf is buffered and also it is meant to do string processing and replace the various %d, %s with the parameters,
// so it is much more complex to execute for this reason, having to parse the string that it receives.

int main(int arg_count, char ** arg_values) {
  FILE *filedesc = fopen("testfile.txt", "a+");
  // r (read), w (write), r+ (read+write), w+ (read+write, truncate to 0 or create)
  // http://www.tutorialspoint.com/cprogramming/c_file_io.htm
  if (filedesc == NULL) {
    printf("fopen failed, errno = %s (%d)\n", strerror(errno), errno);
    return errno;
  } else {
    char msg[] = "hola\n";
    fprintf(filedesc, "%s", msg);
    // Esta manera es más segura que poner fprintf(filedesc, msg);
    // porque evitamos que en "msg" venga una cadena codificada
    // https://security.stackexchange.com/questions/33639/is-this-fprintf-statement-potentially-vulnerable
    fclose(filedesc);
  }
  return 0;
}
