// gcc magic_example2.c -o magic -lmagic

#include <stdio.h>
#include <magic.h>
#include <errno.h>

int main(void)
{
	char *s = "/path/file";
  const char * ftype;

  int msflags = MAGIC_CHECK | MAGIC_COMPRESS | MAGIC_NO_CHECK_TOKENS;
  magic_t ms = NULL;
  ms = magic_open(msflags);
  if (ms == NULL) {
      printf("magic_open(0x%x) failed: %s\n", msflags, errno);
      return 1;
  }

  if (magic_load(ms, NULL) == -1) {
	    printf("magic_load failed: %s\n", magic_error(ms));
      return 1;
  }

  ftype = magic_file(ms, s);

  if (ftype == NULL) {
      printf("Error reconociendo fichero: %s", magic_error(ms));
	    return 1;
  } else {
      printf("tipo de fichero: %s\n", ftype);
  }

  magic_close(ms);

  return 0;
}
