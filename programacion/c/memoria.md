Mirar nota más abajo sobre usar malloc VS calloc


# Stack
Donde se almacenan las variables que se definen en el programa.
Suele ser pequeño

# Heap / free store
Donde podemos reservar memoria dinámicamente.
Generalmente la reserva de este tipo de memoria estará gestionado por el SO

Para poder reservar este tipo de memoria haremos uso de la libreria stdlib:
#include <stdlib.h>
Esta librería nos permitirá usar malloc()

void * p = malloc(4); // reservamos 4 bytes de memoria, usando void para denotar que no tiene tipo

int * p = (int *) malloc(4); // convertimos los 4 bytes sin tipo en un puntero tipo int
if (!p) { // malloc puede devolver 0 que quiere decir que no hay memoria suficiente
  return 1;
}


Una vez no necesitemos más la memoria solicitada usaremos free para liberarla:
free(p);

Hay que tener cuidado con hacer free cuando no debemos.
Por ejemplo, hacer free dos veces del mismo puntero. Esto, depende de que haya en ese trozo de heap, puede suponer un problema.


Usar un puntero que ya ha sido freed tambien supondrá un problema.
Una estrategía es siempre asignar el puntero el valor 0 tras el free.
void * frame = malloc(1024);
...
free(frame);
frame = 0;
Esto provocará un error inmediato si intentamos usar el puntero.
De la otra manera es random, dependerá de cada ocasión y puede dar fallos dificiles de encontrar y problematicos.




Nunca uses malloc

Usa siempre calloc. No hay penalización de rendimiento por tener la memoria limpia, llena de ceros.

Los lectores han informado de un par de cosas:

calloc sí tiene un impacto en el rendimiento en asignaciones enormes
calloc sí tiene un impacto en el rendimiento en plataformas extrañas (sistemas empotrados, videoconsolas, hardware de 30 años de antigüedad, …)
una buena razón para no usar malloc() es que no puede comprobar si hay un desbordamiento y es un potencial fallo de seguridad

Una ventaja de usar calloc() directamente es que, al contrario que malloc(), calloc() puede comprobar un desbordamiento porque suma todo el tamaño necesario antes de que lo pida.


malloc / calloc
#include <stdlib.h>

typedef struct {
  int x;
  int y;
} punto;
punto * p = (punto *) malloc(sizeof(punto));
// reservamos un hueco en memoria del tamaño del struct "punto"
// malloc nos devuelve un puntero, del que hacemos cast a "punto"
// en p tendremos un puntero a un hueco de memoria para almacenar un punto


free
Cuando terminemos de usar una variable llamaremos a free para liberar la memoria
free(p);
