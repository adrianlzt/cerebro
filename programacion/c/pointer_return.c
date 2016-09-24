// Creo que esto podria dar problemas si nos pasan un buf demasiado pequeño

#include <stdio.h>
#include <string.h>

void genera(char* buf, int len)
{
  char cadena[] = "valor";

  if (!buf || len<1)
    return; // bad input. Let junk deal with junk data.

  strncpy(buf, cadena, len-1);
  cadena[len-1] = '\0';
}

int devuelve_numero() {
  return 851;
}

int argumento_int(int numero) {
  int a = numero;
  a += 921;
  return a;
}

void puntero_int_argumento(int* numerito) {
  return;
}

int main(int arg_count,char ** arg_values)
{
  devuelve_numero();
  printf("devuelve nuemro");

  int x = 921;
  argumento_int(x);

  int bola = 321;
  puntero_int_argumento(&bola);

 char otro[37];

 genera(otro, sizeof(otro));

 printf("Genera: %s\n", otro);
 return 0;
}

