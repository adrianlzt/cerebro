#include <stdio.h>
#include <unistd.h>

int main (int arg_count,char ** arg_values) {
  FILE *f2;
  FILE *f3;

  // escribir en stdout
  write(1,"normal\n",7); 
  printf("mas normal\n");
  fprintf(stdout, "fin normal\n");

  // escribir en stderr
  write(2,"error\n",6);
  fprintf(stderr,"otro error\n");

  // Redirijo la stdout y stderr a ficheros
  f2 = freopen("stdout.txt","a",stdout);
  f3 = freopen("stderr.txt","a",stderr);

  printf("Normal a fichero\n");
  fprintf(stdout, "Normal a fichero con fprintf\n");
  fprintf(stderr,"error fichero\n");

  fclose(f2);
  fclose(f3);

  return 0;
}
