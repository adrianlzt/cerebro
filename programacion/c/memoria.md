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
