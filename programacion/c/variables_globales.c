// EVITAR!

#include <stdio.h>

int data; // Sera inicializada por defecto. A 0 por ser un int

void apple_set(int value) {
  data = value;
}

int apple_get() {
  return data;
}

int main() {
  //apple_set(3);
  printf("apples=%d\n", apple_get());

  return 0;
}



/* Otro problema es que una variable global sera compartida por todos los ficheros linkados
 * Si en dos ficheros .c distintos definimos la misma variable global, cuando lo modifiquemos en un sitio se estará modificando en el otro.
 *
 * Para evitar esto podemos usar "static".
 * Si en un fichero definimos la variable como:
 * static int x
 * esta variable global no será compartida.
