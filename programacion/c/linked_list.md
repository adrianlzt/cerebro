Generalmente lo que se suele hacer es un struct que se usará para enlazar la lista:

struct list_element {
  struct list_element * next;
};
typedef struct list_element list_element;


Los datos que queramos almacenar los meteremos en otro struct, cuyo primer elemento será el struct list_element:
typedef struct {
  le header;
  int x;
  int y;
} point;


Tendremos una struct "lista" donde con dos punteros, uno al comienzo de la lista enlazada y otro al final.

Y el "truco".
Cuando tengamos un puntero a un list_element, podremos obtener sus datos haciendo un cast al struct que contiene los datos:

le // un list_element
point * a = (point *)&le
a->x
