Mirar:
function_override.html
function_override2.html

Demostracion de como hacer un override de una función.
Uso, por ejemplo hacemos override de las funciones de conexión para que un programa que intente conectar con internet se le encapsule en un tunel.
Mirar tsocks, dante, torsocks.

Libreria que hacer el override de la función:

libfoo.c:
#include <stdio.h>

void lfunc(void) {
  puts("libfoo");
}

La compilamos:
gcc -Wall -O2 -fPIC -Wl,-soname=libfoo.so -shared libfoo.c -o libfoo.so


Programa cliente:
prog.c:
extern void lfunc(void);
int main(void) {
  lfunc();
  return 0; 
}

Lo compilamos:
gcc -Wall -O2 prog.c -L. -lfoo -o prog


$ LD_LIBRARY_PATH="/home/adrian/Documentos/lib_override" ./prog 
libfoo

