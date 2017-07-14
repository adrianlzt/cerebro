//
// https://en.wikipedia.org/wiki/Sizeof
// Nos devuelve el tamaño de una variable, type o expresión
// Si hacemos un sizeof de un type debemos ponerlo entre parentesis
// No es obligatorio para variables o expresiones.
//
// Nos devuelve un "size_t"
//
#include <stdio.h>

int main() {
  char c;
  printf("%zu, %zu\n", sizeof c, sizeof (int));
  printf("%d\n", (int) sizeof(double));
  return 0;
}
