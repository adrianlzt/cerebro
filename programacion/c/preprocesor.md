Genera un fichero procesando las líneas #xxx

# Include
Por ejemplo, procesa un #include <pepe.h> reemplazando en su posición el contenido de ese file header.

Usaremos:
#include "fichero.h"
para headers files de ¿nuestro proyecto? ¿mismo dir?

Usaremos:
#include <fichero.h>
para header files de ¿librerias standar?


Otros ejemplos donde se usa el preprocesador

# Constantes
#define PI 3.14


# MACROS
// math.h
int multiply(int,int);
#define SQUARE(x) multiply(x,x);

El preprocesador substituira todas las aparaciones de "SQUARE" por multiply(x,x);
Con "#define" hemos creado una macro.
Para evitar confusiones se suelen definir las macros en mayúsculas.


# Codigo condicional a una constante
Esa variable tal vez venga definida en el compilador.

#define LEVEL 2
int main() {
  #if LEVEL > 0
  funcion(a,b);
  #endif

  #if !defined(RUNFAST)
  algo(2);
  #endif
}
